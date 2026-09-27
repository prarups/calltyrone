import React, { useState } from 'react';
import EmergencyBar from './components/EmergencyBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceRequestForm from './components/ServiceRequestForm';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import ServiceAreas from './components/ServiceAreas';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';
import TrackingPage from './components/TrackingPage';
import DownloadGuideModal from './components/DownloadGuideModal';
import { X } from 'lucide-react';
import { BUSINESS_CONFIG } from './config/businessConfig';

export default function App() {
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'tracking'
  const [activeSection, setActiveSection] = useState('home');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isDownloadGuideOpen, setIsDownloadGuideOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // Preset demo request data preserved in code for future re-enablement:
  /*
  const DEMO_PRESET_REQUEST = {
    id: 'MTP-28491',
    customerName: 'David Miller',
    phone: '(404) 482-2246',
    location: '4800 Airport Fwy, Fort Worth, TX 76117',
    vehicle: '2022 Ford F-150 SuperCrew',
    serviceName: 'Flat Tire Change',
    tireSize: '275/55R20',
    timestamp: '10:42 AM',
    status: 'Technician On The Way',
    etaMinutes: 12,
    distanceMiles: 2.4,
    technician: BUSINESS_CONFIG.demoTechnician
  };
  */

  const [activeRequest, setActiveRequest] = useState(null);

  const handleNavigateSection = (sectionId) => {
    setActiveSection(sectionId);

    if (currentView !== 'main') {
      setCurrentView('main');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenRequestForm = (serviceId = null) => {
    if (serviceId && typeof serviceId === 'string') {
      setSelectedServiceId(serviceId);
    }
    if (currentView === 'main') {
      const reqElement = document.getElementById('request-service');
      if (reqElement) {
        reqElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    setIsRequestModalOpen(true);
  };

  const handleServiceSelectedFromGrid = (serviceId) => {
    setSelectedServiceId(serviceId);
    setIsRequestModalOpen(true);
  };

  const handleRequestSubmitted = (newRequestData) => {
    setActiveRequest(newRequestData);
    setIsRequestModalOpen(false);
  };

  const handleOpenTrackingView = (requestObj = null) => {
    // Tracking page view navigation disabled per client requirement
    if (requestObj) {
      setActiveRequest(requestObj);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative">
      
      {/* Top Emergency Dispatch Bar */}
      <EmergencyBar />

      {/* Navigation Header */}
      <Navbar
        onNavigateSection={handleNavigateSection}
        onOpenTracking={() => handleOpenTrackingView()}
        onRequestService={() => handleOpenRequestForm()}
        activeSection={activeSection}
        activeRequestId={activeRequest?.id}
      />

      {/* Main Landing View (Tracking page view commented out for future use) */}
      {/*
      {currentView === 'tracking' && (
        <TrackingPage
          requestData={activeRequest}
          onBackToHome={() => {
            setCurrentView('main');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
      */}
      <main className="space-y-0">
          {/* Hero Section */}
          <Hero
            onRequestService={() => handleOpenRequestForm()}
            onOpenTracking={() => handleOpenTrackingView()}
          />

          {/* Services Catalog */}
          <Services onSelectService={handleServiceSelectedFromGrid} />

          {/* Why Choose Us ("Why American Drivers Trust Us") */}
          <WhyChooseUs />

          {/* Quick Service Dispatch Request Form Engine */}
          <ServiceRequestForm
            preselectedService={selectedServiceId}
            onRequestSubmitted={handleRequestSubmitted}
            onOpenTracking={handleOpenTrackingView}
          />

          {/* How It Works Workflow */}
          <HowItWorks onRequestService={() => handleOpenRequestForm()} />

          {/* Service Areas & ZIP Code Availability Checker */}
          <ServiceAreas onRequestService={() => handleOpenRequestForm()} />

          {/* About Us & Fleet Story */}
          <About />

          {/* Transparent Estimates & Pricing */}
          <Pricing onRequestService={() => handleOpenRequestForm()} />

          {/* Customer Reviews & Testimonials Carousel */}
          <Testimonials />

          {/* FAQ Accordion */}
          <FAQ />

          {/* Contact & Corporate Fleet Inquiry Form */}
          <Contact onOpenDownloadGuide={() => setIsDownloadGuideOpen(true)} />
        </main>

      {/* Footer */}
      <Footer
        onRequestService={() => handleOpenRequestForm()}
        onOpenTracking={() => handleOpenTrackingView()}
        onOpenDownloadGuide={() => setIsDownloadGuideOpen(true)}
      />

      {/* Fixed Bottom Action Bar for Mobile Screens */}
      <MobileActionBar
        onRequestService={() => handleOpenRequestForm()}
        onOpenTracking={() => handleOpenTrackingView()}
        activeRequestId={activeRequest?.id}
      />

      {/* Modal: Quick Request Form Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative max-w-xl w-full max-h-[92vh] overflow-y-auto rounded-2xl">
            <ServiceRequestForm
              preselectedService={selectedServiceId}
              onRequestSubmitted={(req) => {
                handleRequestSubmitted(req);
              }}
              onCancel={() => setIsRequestModalOpen(false)}
              onClose={() => setIsRequestModalOpen(false)}
              isModal={true}
            />
          </div>
        </div>
      )}

      {/* Modal: Download Emergency Service Guide */}
      <DownloadGuideModal
        isOpen={isDownloadGuideOpen}
        onClose={() => setIsDownloadGuideOpen(false)}
      />

    </div>
  );
}
