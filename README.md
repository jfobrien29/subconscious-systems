# Subconscious Systems

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Then, run the Convex dev server:

```bash
npx convex dev
```

If you've never run the Convex dev server before, you'll need to set up a convex account and sign in.
In order for it to run properly, you'll need to add an `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` to your convex environment variables.

Now your app should be running!

## TODOs

To keep it dead simple, we'll track out TODOs in the readme here.

### Build day goals
1. Setup a server 
- Rough overview of it being done on VastAI available [here](https://drive.google.com/file/d/1QcQI9keTj_oo4UmI8qXFTVpgssYuothv/view?usp=drive_link) 
- Stretch goal: Do server spinup dynamically, in code, rather than manually. 

2. Task the server once we hit some threshold, get images back.
- automatic1111 webUI (The Frontend that comes in the Container I setup in the video) has an API. API documentation is available at `<Server_URL>/docs`
- A Python client I wrote is [here](./docs/request_image.py)
- [A JS Example](https://randombits.dev/articles/stable-diffusion/txt2img)

3. Establish economic feasibility of this idea. This ended up being so long a discussion, I created a new section below.

# Economic feasibility
## Our value add
- I see us as having 2 semi-novel ideas:
    - `Batching` (relaxing the time constraint to make more efficient use of the HW)
    - `Knowledge of the market for compute` (what's a good price for a given amount of compute) and a willingness to use:
      - Heterogenous HW
      - Multiple platforms/providers
      - Perhaps even instances that might be subect to termination (and work loss) 
    - That's all messier than using just one stable on demand platform offering a small set of HW options, but offers a lot of opportunity for optimization.

## Our fundamental pitch (IMO)
> Tell us your job (which translates to some amount of inherent compute to accomplish a business goal), time, and budget constraints. We will provide an estimate of whether this can be done and if not a counter proposal. If they like that estimate we execute the order.
  
- Some people might be cost sensitive, but time insensitive. Vice-versa. Or sensitive to both (not ideal clients for us in all likelihood, especially if they have a good understanding of what this should cost).

### Example interaction
> Customer: "I want 1000 images using these 10 blurbs marketing gave me. I want it by the end of the day, for less than 3 cents an image."

> A possible response from us: "We can't do that, but could do it for 3.5 cents/image. Or if you can wait 3 days, we could do 2.5 cents/image."


## Crucial questions
- We have a few crucial questions to answer:
  1. What's a good price for different pieces of HW? 
  2. What kind of performance do we get for specific HW? There's straightforward math that offers some ideas (FLOPs offered by each), but some specific workflows are going to be less intuitive (newer generations of HW offering newer operations that favor the workflow, more VRAM preventing bottlenecking, etc.). 

Basically, all that sums up to `What is the price threshold at which a piece of HW will make sense to use for a Workflow given my constraints?`

## Text-to-Image HW performances
I have found some resources around the Text-to-Image space:
- [Tomshardware comparing consumer GPU performance](https://www.tomshardware.com/pc-components/gpus/stable-diffusion-benchmarks)
- Stable Diffusion System Performance (an extension)
  - [HTML Table of results](https://vladmandic.github.io/sd-extension-system-info/pages/benchmark.html)
  - [Github repo](https://github.com/vladmandic/sd-extension-system-info)

## Compute suppliers typical costs
I think we need to start scraping or otherwise monitoring vendors. These are the ones I've found (I'm sure I'm missing a lot):
- [RunPod](https://www.runpod.io/pricing)
- [Vast.AI](https://vast.ai/)
- Amazon AWS
- Google
- MSFT Azure
- Paperspace
- [TensorDock](https://marketplace.tensordock.com/deploy?next=/order_list?)
