
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, User, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';

const doctors = [
  { 
    id: 1, 
    name: 'Dr. Neha Sharma', 
    specialty: 'General Physician', 
    experience: '12 years',
    availability: 'Mon-Sat, 10AM-1PM',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop'
  },
  { 
    id: 2, 
    name: 'Dr. Rajesh Kumar', 
    specialty: 'Cardiologist', 
    experience: '15 years',
    availability: 'Tue-Fri, 6PM-9PM',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop'
  },
  { 
    id: 3, 
    name: 'Dr. Priya Patel', 
    specialty: 'Pediatrician', 
    experience: '10 years',
    availability: 'Mon-Wed-Fri, 3PM-8PM',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&auto=format&fit=crop'
  },
  { 
    id: 4, 
    name: 'Dr. Amit Singh', 
    specialty: 'Neurologist', 
    experience: '18 years',
    availability: 'Thu-Sat, 11AM-5PM',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop'
  }
];

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
  '12:00 PM', '12:30 PM', '4:00 PM', '4:30 PM', 
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
];

const PhysicianBooking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    location: 'online',
    symptoms: ''
  });

  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctor(doctorId);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Appointment scheduled successfully!', {
      description: `Your appointment with ${doctors.find(d => d.id === selectedDoctor)?.name} has been booked.`
    });
    navigate('/');
  };

  return (
    <MobileLayout>
      <div className="p-4">
        <Button 
          variant="ghost" 
          className="text-white p-0 mb-4" 
          onClick={() => step === 1 ? navigate('/') : setStep(1)}
        >
          <ChevronLeft size={24} />
          <span className="ml-2">{step === 1 ? 'Back to Home' : 'Back to Doctors'}</span>
        </Button>
        
        <h1 className="text-2xl font-bold text-white mb-6">Book a Physician</h1>
        
        {step === 1 ? (
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white mb-4">Select a doctor to schedule your appointment:</p>
              
              {doctors.map(doctor => (
                <Card key={doctor.id} className="mb-4 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty} • {doctor.experience}</p>
                        <div className="flex items-center mt-1">
                          <Clock size={14} className="text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{doctor.availability}</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleDoctorSelect(doctor.id)}
                        className="bg-medical-blue hover:bg-medical-blue/90"
                      >
                        Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="mb-6">
              <h2 className="text-xl font-medium text-white">
                Book an appointment with {doctors.find(d => d.id === selectedDoctor)?.name}
              </h2>
              <p className="text-white/70 text-sm">Fill in your details to schedule your appointment</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-1">Your Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  <Input 
                    name="name" 
                    placeholder="Enter your name"
                    className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-white/50"
                    value={bookingDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Phone Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  <Input 
                    name="phone" 
                    type="tel" 
                    placeholder="Enter your phone number"
                    className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-white/50"
                    value={bookingDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm mb-1">Preferred Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    <Input 
                      name="date" 
                      type="date" 
                      className="pl-10 bg-white/20 border-white/20 text-white"
                      value={bookingDetails.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm mb-1">Preferred Time</label>
                  <Select 
                    value={bookingDetails.time} 
                    onValueChange={(value) => handleSelectChange('time', value)}
                  >
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Appointment Type</label>
                <Select 
                  value={bookingDetails.location} 
                  onValueChange={(value) => handleSelectChange('location', value)}
                >
                  <SelectTrigger className="bg-white/20 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online Consultation</SelectItem>
                    <SelectItem value="clinic">Visit Clinic</SelectItem>
                    <SelectItem value="home">Home Visit (Extra Charges)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-white text-sm mb-1">Symptoms or Notes</label>
                <Textarea 
                  name="symptoms" 
                  placeholder="Briefly describe your symptoms or reason for visit"
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                  value={bookingDetails.symptoms}
                  onChange={handleInputChange}
                />
              </div>
              
              <Button type="submit" className="w-full bg-medical-green hover:bg-medical-green/90">
                Confirm Booking
              </Button>
            </form>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default PhysicianBooking;
