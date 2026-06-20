import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload PDF',
      description: 'Add your book file',
    },
    {
      number: 2,
      title: 'AI Processing',
      description: 'We analyze the content',
    },
    {
      number: 3,
      title: 'Voice Chat',
      description: 'Discuss with AI',
    },
  ]

  return (
    <section className="wrapper pt-28">
      <div className="library-hero-card">
        <div className="library-hero-content">
          {/* Left Section */}
          <div className="library-hero-text">
              <h1 className="library-hero-title text-4xl font-serif font-bold">
                Your Library
              </h1>
              <p className="library-hero-description">
                Convert your books into interactive AI conversations. <br className="hidden md:block" /> 
                Listen, learn, and discuss
                your favorite reads.
              </p>

            <Link
              href="/books/new"
              className="library-cta-primary mt-4 flex item-center justify-center"
            >
              <span className="text-3xl font-light mb-1 mr-2">+</span>
              <span className="text-[#212a3b]"> Add new book</span>
             
            </Link>
          </div>

          {/* Center Section - Illustration */}
          <div className="library-hero-illustration-desktop">
              <Image
                src="/assets/hero-illustration.png"
                alt="Vintage books and a globe"
                width={400}
                height={400}
                className="object-contain"
              />
          </div>

           {/* Center Section - mobile */}
          <div className="library-hero-illustration">
              <Image
                src="/assets/hero-illustration.png"
                alt="Vintage books and a globe"
                width={400}
                height={400}
                className="object-contain"
              />
          </div>

          {/* Right Section - Steps */}
          <div className="library-steps-card min-w-[260px] max-w-[280px] z-10 shadow-soft-md">
            <ul className="space-y-6">
              {steps.map((step) => (
                <li key={step.number} className="library-step-item">
                  <div className="w-10 h-10 min-w-0 min-h-10 rounded-full border border-gray-300 flex
                  items-center justify-center text-lg font-medium">
                    {step.number}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="library-step-title text-lg font-bold">
                      {step.title}
                    </h3>
                    <p className="library-step-description text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

     
    </section>
  )
}

export default HeroSection
