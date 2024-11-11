'use client';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Home() {
  const getAllPrompts = useQuery(api.prompts.getAllPrompts);
  const getAllPromptsCount = useQuery(api.prompts.getAllPromptsCount);
  const submitPrompt = useMutation(api.prompts.saveEmailAndPrompt);

  const validationSchema = yup.object().shape({
    prompt: yup.string().required('Prompt is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    defaultValues: {
      prompt: '',
      email: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: { prompt: string; email: string }) => {
    await submitPrompt(data);
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] relative">
      <div className="relative z-10">
        <div className="py-12 md:py-24 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-lg"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
          <h1 className="font-bold text-center relative animate-[fade-in-down_0.4s_ease-out_forwards]">
            <span className="font-bold md:text-9xl text-4xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent py-8">
              Subconscious Systems
            </span>
          </h1>
          <p className="text-center text-lg md:text-xl mt-8 text-muted-foreground max-w-2xl mx-auto relative animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-200">
            Background AI processes at extremely low cost
          </p>
          <div className="flex gap-4 mt-8 animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-300">
            <Button
              className="text-sm md:text-lg px-6 py-2"
              onClick={() =>
                document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Try For Free
            </Button>
            <Button
              variant="outline"
              className="text-smmd:text-lg px-6 py-2"
              onClick={() =>
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              What Is This?
            </Button>
          </div>
        </div>

        <div className="max-w-xl mx-auto pt-12" id="demo">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 bg-white animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-500">
            <h2 className="text-lg font-semibold mb-2">
              Try Our Beta Launch: Free Stable Diffusion Generation
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Submit an image prompt, and we will generate an image for you with Stable Diffusion at
              a time when it's cheapest for us to run. We're generating the first 1000 images free.
              Submit a prompt now, and we'll send you an email when it's ready (submit up to 10
              prompts).
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <textarea
                  {...register('prompt')}
                  placeholder="Enter your prompt..."
                  className="w-full p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
                {errors.prompt && <p className="text-sm text-red-500">{errors.prompt.message}</p>}
              </div>
              <div className="space-y-2">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Prompt For Generation'}
              </Button>
            </form>
          </div>
        </div>

        <div className="max-w-xl mx-auto mt-12">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-2">Pending Prompts</h3>
            <p className="text-muted-foreground mb-2 border-b pb-8">
              We're generating the first 1000 images free.
            </p>
            {getAllPrompts?.map((prompt: any) => (
              <div
                key={prompt._id}
                className="py-2 border-b last:border-b-0 text-muted-foreground text-sm"
              >
                {prompt.prompt}
              </div>
            ))}
            {getAllPromptsCount && getAllPromptsCount > 5 && (
              <p className="text-sm text-muted-foreground mt-2">
                +{getAllPromptsCount - 5} more prompts submitted
              </p>
            )}
          </div>
        </div>

        <div className="max-w-xl mx-auto mt-12 mb-16">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
            <h2 className="text-lg font-semibold mb-4" id="about">
              About Subconscious Systems
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                We're at team from MIT designing a platform from the ground up for asynchronous
                inference. By allowing for delayed processing, we can optimize your AI workloads in
                ways that aren't possible with real-time inference.
              </p>
              <p>
                When your use case can tolerate a time delay - whether it's minutes or hours - we
                can:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Batch similar requests together for higher throughput</li>
                <li>Schedule processing during off-peak hours when compute costs are lower</li>
                <li>Queue and prioritize jobs based to push our hardware utilization</li>
                <li>And much more!</li>
              </ul>
              <p>
                You shouldn't have to think about any of this. You should be focused on building
                epic experiences for whatever you're making. We make AI cheaper, you focus on
                building.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center text-sm text-muted-foreground">
        Subconscious Systems © 2024
      </footer>
    </div>
  );
}
