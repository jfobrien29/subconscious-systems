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
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
      <div className="absolute inset-0 bg-[url('/frf2_nobg.png')] bg-[length:120px_120px] [background-repeat:space_space] opacity-10 z-0"></div>
      <div className="relative z-10">
        <h1 className="font-bold text-center mt-8 ">
          <span className="md:text-8xl text-5xl">Subconscious Systems</span>
        </h1>
        <p className="text-center text-xl mt-6 text-muted-foreground max-w-2xl mx-auto">
          Simple, background AI processes at extremely low cost
        </p>

        <div className="max-w-xl mx-auto mt-12">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
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
            {getAllPromptsCount && (
              <p className="text-sm text-muted-foreground">
                {getAllPromptsCount} prompts submitted
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
