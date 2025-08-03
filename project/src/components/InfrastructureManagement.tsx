import React, { useState } from 'react';
import { Building, Clock, Users, MapPin, Settings } from 'lucide-react';

interface Classroom {
  id: string;
  name: string;
  capacity: number;
  timeSlot: '8AM-3PM' | '10AM-5PM';
  assignedYear: 'SE' | 'TE' | 'BE';
  floor: number;
  amenities: string[];
}

interface Lab {
  id: string;
  name: string;
  capacity: number;
  type: string;
  equipment: string[];
  floor: number;
}

const InfrastructureManagement = () => {
  const [classrooms] = useState<Classroom[]>([
    {
      id: '1',
      name: 'Room A-101',
      capacity: 90,
      timeSlot: '8AM-3PM',
      assignedYear: 'SE',
      floor: 1,
      amenities: ['Projector', 'AC', 'Audio System'],
    },
    {
      id: '2',
      name: 'Room A-102',
      capacity: 90,
      timeSlot: '8AM-3PM',
      assignedYear: 'TE',
      floor: 1,
      amenities: ['Projector', 'AC', 'Audio System'],
    },
    {
      id: '3',
      name: 'Room A-103',
      capacity: 90,
      timeSlot: '8AM-3PM',
      assignedYear: 'BE',
      floor: 1,
      amenities: ['Projector', 'AC', 'Audio System'],
    },
    {
      id: '4',
      name: 'Room B-201',
      capacity: 90,
      timeSlot: '10AM-5PM',
      assignedYear: 'SE',
      floor: 2,
      amenities: ['Smart Board', 'AC', 'Audio System'],
    },
    {
      id: '5',
      name: 'Room B-202',
      capacity: 90,
      timeSlot: '10AM-5PM',
      assignedYear: 'TE',
      floor: 2,
      amenities: ['Smart Board', 'AC', 'Audio System'],
    },
    {
      id: '6',
      name: 'Room B-203',
      capacity: 90,
      timeSlot: '10AM-5PM',
      assignedYear: 'BE',
      floor: 2,
      amenities: ['Smart Board', 'AC', 'Audio System'],
    },
  ]);

  const [labs] = useState<Lab[]>([
    {
      id: '1',
      name: 'Programming Lab 1',
      capacity: 30,
      type: 'Computer Lab',
      equipment: ['30 PCs', 'Projector', 'AC'],
      floor: 1,
    },
    {
      id: '2',
      name: 'Programming Lab 2',
      capacity: 30,
      type: 'Computer Lab',
      equipment: ['30 PCs', 'Projector', 'AC'],
      floor: 1,
    },
    {
      id: '3',
      name: 'Database Lab',
      capacity: 30,
      type: 'Specialized Lab',
      equipment: ['30 PCs', 'Server', 'Projector'],
      floor: 2,
    },
    {
      id: '4',
      name: 'Network Lab',
      capacity: 30,
      type: 'Specialized Lab',
      equipment: ['Network Equipment', 'Switches', 'Routers'],
      floor: 2,
    },
    {
      id: '5',
      name: 'AI/ML Lab',
      capacity: 30,
      type: 'Research Lab',
      equipment: ['High-end PCs', 'GPU Servers', 'Projector'],
      floor: 3,
    },
    {
      id: '6',
      name: 'Software Lab',
      capacity: 30,
      type: 'Development Lab',
      equipment: ['30 PCs', 'Development Tools', 'Projector'],
      floor: 3,
    },
    {
      id: '7',
      name: 'Project Lab',
      capacity: 30,
      type: 'General Lab',
      equipment: ['30 PCs', 'Collaboration Tools', 'Projector'],
      floor: 3,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'classrooms' | 'labs'>('classrooms');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Infrastructure Management</h2>
        <p className="text-gray-600 mt-1">
          Manage classrooms and laboratory facilities
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('classrooms')}
          className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'classrooms'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Classrooms ({classrooms.length})
        </button>
        <button
          onClick={() => setActiveTab('labs')}
          className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'labs'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Laboratories ({labs.length})
        </button>
      </div>

      {/* Classrooms Tab */}
      {activeTab === 'classrooms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div key={classroom.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{classroom.name}</h3>
                    <p className="text-sm text-gray-600">Floor {classroom.floor}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Capacity:</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{classroom.capacity} students</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Time Slot:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{classroom.timeSlot}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Assigned Year:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    classroom.assignedYear === 'SE' ? 'bg-green-100 text-green-800' :
                    classroom.assignedYear === 'TE' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {classroom.assignedYear}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {classroom.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Labs Tab */}
      {activeTab === 'labs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{lab.name}</h3>
                    <p className="text-sm text-gray-600">Floor {lab.floor}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Capacity:</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{lab.capacity} students</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    lab.type === 'Computer Lab' ? 'bg-blue-100 text-blue-800' :
                    lab.type === 'Specialized Lab' ? 'bg-purple-100 text-purple-800' :
                    lab.type === 'Research Lab' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {lab.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Equipment:</p>
                  <div className="flex flex-wrap gap-1">
                    {lab.equipment.map((equipment, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {equipment}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <Building className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Classrooms</p>
              <p className="text-2xl font-bold text-gray-900">{classrooms.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Total Labs</p>
              <p className="text-2xl font-bold text-gray-900">{labs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Total Capacity</p>
              <p className="text-2xl font-bold text-gray-900">
                {classrooms.reduce((sum, c) => sum + c.capacity, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Available Hours</p>
              <p className="text-2xl font-bold text-gray-900">42/week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureManagement;