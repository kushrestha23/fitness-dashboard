import StoryOpening from './components/StoryOpening';
import StoryBaseline from './components/StoryBaseline';
import StoryWalking from './components/StoryWalking';
import StoryTopDays from './components/StoryTopDays';
import StoryCorrelation from './components/StoryCorrelation';
import StoryWhoop from './components/StoryWhoop';
import StoryRecords from './components/StoryRecords';
import StorySummary from './components/StorySummary';

export default function Home() {
  return (
    <main className="bg-black w-full min-h-screen text-slate-200 selection:bg-indigo-500/30 font-sans tracking-tight">
      <StoryOpening />
      <StoryBaseline />
      <StoryWalking />
      <StoryTopDays />
      <StoryCorrelation />
      <StoryWhoop />
      <StoryRecords />
      <StorySummary />
    </main>
  );
}