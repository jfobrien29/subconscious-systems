'use client';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Home() {
  const getAllPrompts = useQuery(api.email.getAllPrompts);
  const getAllPromptsCount = useQuery(api.email.getAllPromptsCount);
  const submitPrompt = useMutation(api.email.saveEmailAndPrompt);

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
    <div className="flex flex-col min-h-screen p-2 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] relative">
      <div className="relative z-10">
        <div className="md:min-h-[50vh] min-h-[40vh] flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-lg"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
          <h1 className="font-bold text-center relative animate-in">
            <span className="md:text-9xl text-5xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent py-8">
              Subconscious Systems
            </span>
          </h1>
          <p className="text-center text-xl mt-8 text-muted-foreground max-w-2xl mx-auto relative">
            Simple, background AI processes at extremely low cost
          </p>
        </div>

        <div className="max-w-xl mx-auto mt-12">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 bg-white">
            <h2 className="text-lg font-semibold mb-2">
              Our First Product: Free AI Image Generation
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Submit an image prompt, and we will generate an image for you at a time when it's
              cheapest for us to run. We're generating the first 1000 images free. Submit a prompt
              now, and we'll send you an email when it's ready!
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
            <h3 className="text-xl font-semibold mb-4">Pending Prompts</h3>
            <p className="text-sm text-muted-foreground mb-2">
              We're generating the first 1000 images free.
            </p>
            {getAllPrompts?.map((prompt: any) => (
              <div key={prompt._id} className="py-2 border-b last:border-b-0">
                {prompt.prompt} -{' '}
                {(
                  prompt.email[0] +
                  '****' +
                  prompt.email.substring(prompt.email.indexOf('@'))
                ).toLocaleLowerCase()}
              </div>
            ))}
            {getAllPromptsCount && getAllPromptsCount > 5 && (
              <p className="text-sm text-muted-foreground mt-2">
                {getAllPromptsCount - 5} more prompts submitted
              </p>
            )}
          </div>
        </div>

        <div className="max-w-xl mx-auto mt-12 mb-16">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
            <h2 className="text-lg font-semibold mb-4">About Subconscious Systems</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                We're building a platform made for asynchronous inference at it's core. By allowing
                for delayed processing, we can optimize your AI workloads in ways that aren't
                possible with real-time inference.
              </p>
              <p>
                When your use case can tolerate a time delay - whether it's minutes or hours - we
                can:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Batch similar requests together for higher throughput</li>
                <li>Schedule processing during off-peak hours when compute costs are lower</li>
                <li>Optimize resource allocation across different time zones</li>
                <li>Queue and prioritize jobs based on various efficiency metrics</li>
              </ul>
              <p>
                The result? Significant cost savings passed directly to you, without compromising on
                quality or reliability.
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
