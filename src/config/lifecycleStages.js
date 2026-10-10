import { CheckCircle2, Clock, Truck, Wrench, Navigation } from 'lucide-react';

export const LIFECYCLE_STAGES = [
  { id: 'received', label: 'Request Received', desc: 'Dispatch confirmed request details', icon: Clock },
  { id: 'assigned', label: 'Technician Assigned', desc: 'Unit #408 assigned to your job', icon: CheckCircle2 },
  { id: 'on_the_way', label: 'Technician On The Way', desc: 'Traveling via Interstate 820', icon: Truck },
  { id: 'arriving', label: 'Arriving Soon', desc: 'Less than 2 miles away', icon: Navigation },
  { id: 'in_progress', label: 'Service In Progress', desc: 'Tech performing service on-site', icon: Wrench },
  { id: 'completed', label: 'Service Completed', desc: 'Verified, tested & back on road', icon: CheckCircle2 }
];
