'use client';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useForm } from 'react-hook-form';

export default function Home() {
  const getAllPrompts = useQuery(api.email.getAllPrompts);
  const submitPrompt = useMutation(api.email.saveEmailAndPrompt);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      prompt: '',
      email: '',
    },
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
          <span className="md:text-8xl text-6xl">Subconscious Systems</span>
        </h1>
        <p className="text-center text-xl mt-6 text-muted-foreground max-w-2xl mx-auto">
          Simple, background AI processes at extremely low cost
        </p>

        <div className="max-w-xl mx-auto mt-12">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
            <h2 className="text-lg font-semibold mb-2">Generate AI Images</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Submit an image prompt, and we'll generate an image for you at a later time when it's
              cheapest to run. We'll send you an email when it's ready!
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <input
                  {...register('prompt', { required: true })}
                  type="text"
                  placeholder="Enter your prompt..."
                  className="w-full p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
              </div>
              <div className="space-y-2">
                <input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
              </div>
              <Button
                type="submit"
                className="w-full text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Generate Image'}
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
          </div>
        </div>
      </div>
    </div>
  );
}
