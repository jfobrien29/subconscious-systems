'use client';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function StayUpdatedDialog({
  buttonText = 'Stay Updated',
  className,
}: {
  buttonText?: string;
  className?: string;
}) {
  const saveEmailAndMessage = useMutation(api.emails.saveEmailAndMessage);
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    message: yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: { email: string; message?: string }) => {
    await saveEmailAndMessage(data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[425px] rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Stay Updated</DialogTitle>
            <DialogDescription>
              Enter your email to reach out and receive updates about Subconscious Systems.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input {...register('email')} type="email" placeholder="you@example.com" />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-right">
                Message (optional)
              </Label>
              <div className="col-span-3">
                <Textarea
                  {...register('message')}
                  placeholder="I have an inference workload I'd like to optimize..."
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving Email...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] relative">
      <div className="relative z-10">
        <div className="py-12 md:py-24 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent rounded-lg animate-[increase-height-and-fade-in_0.5s_ease-out_forwards]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:24px_24px] animate-[fade-in-down_0.4s_ease-out_forwards]"></div>
          <h1 className="font-bold text-center relative animate-[fade-in-down_0.4s_ease-out_forwards]">
            <span className="font-bold md:text-9xl text-4xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent py-8">
              Subconscious Systems
            </span>
          </h1>
          <p className="text-center text-lg md:text-xl mt-8 text-muted-foreground max-w-2xl mx-auto relative animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-200">
            Asynchronous AI Inference at a Fraction of the Cost
          </p>
          <div className="flex gap-4 mt-8 animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-300">
            <StayUpdatedDialog buttonText="Stay Updated" className="text-sm md:text-lg px-6 py-2" />
            <Button
              variant="outline"
              className="text-sm md:text-lg px-6 py-2"
              onClick={() =>
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Learn More
            </Button>
          </div>
        </div>

        <div
          className="max-w-xl mx-auto pt-6 mt-6 mb-16 animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-500"
          id="about"
        >
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
            <h2 className="text-lg font-semibold mb-4">About Subconscious Systems</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                When your use case can tolerate a delay, whether it's minutes or hours, we can
                optimize your AI inference in ways that aren't feasible with real-time responses.
                Behind the scenes, we're able to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Schedule processing during off-peak hours when compute costs are lower</li>
                <li>Run compute in regions with cheaper and greener electricity</li>
                <li>Batch similar requests together for higher throughput</li>
                <li>And much more!</li>
              </ul>
              <p>
                You shouldn’t need to worry about optimizing infrastructure. Instead, focus on
                building epic experiences core to your product. We make AI cheaper, so you can focus
                on building.
              </p>
              <p>
                We're a team from MIT designing a platform from the ground up to optimize
                asynchronous AI inference workloads. As compute, energy, and cost constraints
                intensify and inference-time compute workloads scale up, we aim to power the next
                wave of AI products. We’d love to hear about what you're building and explore how
                our platform can support you.
              </p>

              <StayUpdatedDialog className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center text-sm text-muted-foreground">
        <div className="flex gap-2 items-center justify-center">
          <p>Subconscious Systems © 2024</p>
          <Image src="/android-chrome-192x192.png" alt="MIT" width={20} height={20} />
        </div>
      </footer>
    </div>
  );
}
