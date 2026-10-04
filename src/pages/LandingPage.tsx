import { Seo } from '../components/Seo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Hero } from '../components/landing/Hero';
import { Benefits } from '../components/landing/Benefits';
import { AISection } from '../components/landing/AISection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { ExampleChips } from '../components/landing/ExampleChips';
import { StudentFeatures } from '../components/landing/StudentFeatures';
import { ForUniversity } from '../components/landing/ForUniversity';
import { FAQ } from '../components/landing/FAQ';
import { TechStack, Team } from '../components/landing/TechTeam';
import { FinalCTA } from '../components/landing/FinalCTA';
import { seo } from '../data/site';

export default function LandingPage() {
  return (
    <>
      <Seo title={seo.home.title} description={seo.home.description} path="/" />
      <Navbar />
      <main id="main">
        <Hero />
        <Benefits />
        <AISection />
        <HowItWorks />
        <ExampleChips />
        <StudentFeatures />
        <ForUniversity />
        <FAQ />
        <TechStack />
        <Team />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
