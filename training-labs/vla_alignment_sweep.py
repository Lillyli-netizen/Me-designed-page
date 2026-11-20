"""Compare frame offsets at two levels of synthetic temporal correlation."""

import argparse
import json
from statistics import mean, stdev

import torch

from vla_cpu_lab import evaluate, fit, make_episodes


def run_sweep(trials):
    results = []
    for correlation in (0.0, 0.9):
        losses = [[] for _ in range(4)]
        for seed in range(7, 7 + trials):
            rng = torch.Generator().manual_seed(seed)
            inputs, targets, valid = make_episodes(rng, 24, correlation)
            held_out = make_episodes(rng, 8, correlation)
            frames = targets.shape[1] - (len(losses) - 1)
            common_mask = valid[:, -frames:]
            for lag, series in enumerate(losses):
                model = fit(inputs[:, :frames], targets[:, lag:lag + frames], common_mask)
                series.append(evaluate(model, *held_out))
        results.append({
            "correlation": correlation,
            "offsets": [
                {"frames": lag, "mean": mean(series), "sd": stdev(series) if trials > 1 else 0.0}
                for lag, series in enumerate(losses)
            ],
        })
    return {"trials": trials, "first_seed": 7, "metric": "held-out masked MSE", "conditions": results}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--trials", type=int, default=5)
    args = parser.parse_args()
    if args.trials < 1:
        parser.error("--trials must be positive")
    torch.set_num_threads(1)
    print(json.dumps(run_sweep(args.trials), indent=2))
