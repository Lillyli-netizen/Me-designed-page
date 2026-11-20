"""A synthetic, CPU-only experiment for action chunks and alignment."""

import torch
from torch import nn


def make_episodes(generator, count, correlation=0.0):
    frames, horizon = 12, 4
    state = torch.randn(count, frames, 2, generator=generator)
    if correlation:
        scale = (1 - correlation**2) ** 0.5
        for frame in range(1, frames):
            state[:, frame] = correlation * state[:, frame - 1] + scale * state[:, frame]
    instruction = torch.randint(0, 2, (count, 1, 1), generator=generator).float()
    instruction = (2 * instruction - 1).expand(-1, frames, -1)
    observations = torch.cat((state, instruction), dim=-1)

    left, right = state.unbind(dim=-1)
    command = instruction.squeeze(-1)
    targets = torch.stack((left + command, right - command, torch.zeros_like(left)), dim=-1)
    offsets = torch.arange(horizon).float() * 0.1
    direction = torch.tensor([1.0, -1.0, 0.0])
    chunks = targets[:, :, None, :] + offsets[:, None] * direction

    time_mask = torch.arange(frames)[:, None] + torch.arange(horizon) < frames
    channel_mask = torch.tensor([True, True, False])
    mask = (time_mask[..., None] & channel_mask).expand_as(chunks)
    return observations, chunks, mask


def masked_mse(predictions, targets, mask):
    return (predictions[mask] - targets[mask]).square().mean()


def fit(observations, targets, mask):
    torch.manual_seed(10)
    horizon, channels = targets.shape[-2:]
    policy = nn.Linear(observations.shape[-1], horizon * channels)
    optimizer = torch.optim.Adam(policy.parameters(), lr=0.04)

    for _ in range(200):
        optimizer.zero_grad()
        predictions = policy(observations).unflatten(-1, (horizon, channels))
        loss = masked_mse(predictions, targets, mask)
        loss.backward()
        optimizer.step()
    return policy


def evaluate(policy, observations, targets, mask):
    policy.eval()
    with torch.inference_mode():
        predictions = policy(observations).unflatten(-1, targets.shape[-2:])
        return masked_mse(predictions, targets, mask).item()


def main():
    torch.set_num_threads(1)
    rng = torch.Generator().manual_seed(7)
    observations, chunks, mask = make_episodes(rng, 24)
    test = make_episodes(rng, 8)
    train_observations = observations[:, :-1]
    common_mask = mask[:, 1:]
    aligned = fit(train_observations, chunks[:, :-1], common_mask)
    shifted = fit(train_observations, chunks[:, 1:], common_mask)

    print(f"observations: {tuple(observations.shape)}  [episode, frame, feature]")
    print(f"action chunks: {tuple(chunks.shape)}  [episode, frame, horizon, channel]")
    print(f"valid action values: {mask.sum().item()} / {mask.numel()}")
    print(f"aligned test masked MSE: {evaluate(aligned, *test):.6f}")
    print(f"shifted test masked MSE: {evaluate(shifted, *test):.6f}")


if __name__ == "__main__":
    main()
