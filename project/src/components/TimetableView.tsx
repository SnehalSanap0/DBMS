import React, { useState } from 'react';
import { Calendar, Filter, Download, Eye, Users, BookOpen } from 'lucide-react';

interface TimetableSlot {
  time: string;
  subject: string;
  faculty: string;
  room: string;
  type: 'theory' | 'lab';
  batch?: string;
}

interface DaySchedule {
  day: string;
  slots: TimetableSlot[];
}

const TimetableView = () => {
  const [viewType, setViewType] = useState<'year' | 'batch' | 'faculty'>('year');
  const [selectedYear, setSelectedYear] = useState<'SE' | 'TE' | 'BE'>('SE');
  const [selectedBatch, setSelectedBatch] = useState<'A' | 'B' | 'C'>('A');
  const [selectedFaculty, setSelectedFaculty] = useState('Dr. Sharma');

  // Sample timetable data
  const sampleTimetable: DaySchedule[] = [
    {
      day: 'Monday',
      slots: [
        {
          time: '8:00-9:00',
          subject: 'DBMS',
          faculty: 'Dr. Sharma',
          room: 'A-101',
          type: 'theory',
        },
        {
          time: '9:00-10:00',
          subject: 'Software Engineering',
          faculty: 'Prof. Patel',
          room: 'A-101',
          type: 'theory',
        },
        {
          time: '10:00-10:15',
          subject: 'Break',
          faculty: '',
          room: '',
          type: 'theory',
        },
        {
          time: '10:15-11:15',
          subject: 'Data Structures',
          faculty: 'Dr. Kumar',
          room: 'A-101',
          type: 'theory',
        },
        {
          time: '11:15-12:15',
          subject: 'Computer Networks',
          faculty: 'Prof. Singh',
          room: 'A-101',
          type: 'theory',
        },
        {
          time: '12:15-1:15',
          subject: 'Lunch Break',
          faculty: '',
          room: '',
          type: 'theory',
        },
        {
          time: '1:15-3:15',
          subject: 'DBMS Lab',
          faculty: 'Dr. Sharma',
          room: 'Database Lab',
          type: 'lab',
          batch: 'A',
        },
      ],
    },
    {
      day: 'Tuesday',
      slots: [
        {
          time: '8:00-9:00',
          subject: 'Operating Systems',
          faculty: 'Dr. Verma',
          room: 'A-101',
          type: 'theory',
        },
        {
          time: '9:00-10:00',
          subject: 'Web Development',
          faculty: 'Prof. Patel',
          room: 'A-101',
          type: 'theory',
        },
        {
          time: '10:00-10:15',
          subject: 'Break',
          faculty: '',
          room: '',
          type: 'theory',
        },
        {
          time: '10:15-11:15',
          subject: 'DBMS',
          faculty: 'Dr. Sharma',
          room: 'A-101',
          type: 'theory',
        },
        {
          time: '11:15-12:15',
          subject: 'Software Engineering',
          faculty: 'Prof. Patel',
          room: 'A-101',
          type: 'theory',
        },
        {
          time: '12:15-1:15',
          subject: 'Lunch Break',
          faculty: '',
          room: '',
          type: 'theory',
        },
        {
          time: '1:15-3:15',
          subject: 'Programming Lab',
          faculty: 'Dr. Kumar',
          room: 'Programming Lab 1',
          type: 'lab',
          batch: 'A',
        },
      ],
    },
    // Add more days as needed
  ];

  const timeSlots = [
    '8:00-9:00',
    '9:00-10:00',
    '10:00-10:15',
    '10:15-11:15',
    '11:15-12:15',
    '12:15-1:15',
    '1:15-3:15',
    '3:15-5:15',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getSlotForTimeAndDay = (time: string, day: string): TimetableSlot | null => {
    const daySchedule = sampleTimetable.find(d => d.day === day);
    return daySchedule?.slots.find(slot => slot.time === time) || null;
  };

  const renderTimetableGrid = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Time
                </th>
                {days.map((day) => (
                  <th key={day} className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-25">
                    {time}
                  </td>
                  {days.map((day) => {
                    const slot = getSlotForTimeAndDay(time, day);
                    return (
                      <td key={`${day}-${time}`} className="border border-gray-200 px-2 py-2">
                        {slot ? (
                          <div className={`p-2 rounded-lg text-xs ${
                            slot.subject === 'Break' || slot.subject === 'Lunch Break'
                              ? 'bg-gray-100 text-gray-600'
                              : slot.type === 'lab'
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            <div className="font-medium">{slot.subject}</div>
                            {slot.faculty && (
                              <div className="text-gray-600 mt-1">{slot.faculty}</div>
                            )}
                            {slot.room && (
                              <div className="text-gray-500">{slot.room}</div>
                            )}
                            {slot.batch && (
                              <div className="text-green-600 font-medium">Batch {slot.batch}</div>
                            )}
                          </div>
                        ) : (
                          <div className="p-2 text-center text-gray-400 text-xs">
                            Free
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Timetable View</h2>
          <p className="text-gray-600 mt-1">
            View and manage generated timetables
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Eye className="h-4 w-4" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">View Options</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              View Type
            </label>
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value as 'year' | 'batch' | 'faculty')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="year">Year-wise (Theory)</option>
              <option value="batch">Batch-wise (Labs)</option>
              <option value="faculty">Faculty-wise</option>
            </select>
          </div>

          {viewType === 'year' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value as 'SE' | 'TE' | 'BE')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="SE">Second Year (SE)</option>
                <option value="TE">Third Year (TE)</option>
                <option value="BE">Final Year (BE)</option>
              </select>
            </div>
          )}

          {viewType === 'batch' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value as 'SE' | 'TE' | 'BE')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="SE">Second Year (SE)</option>
                  <option value="TE">Third Year (TE)</option>
                  <option value="BE">Final Year (BE)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Batch
                </label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value as 'A' | 'B' | 'C')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="A">Batch A</option>
                  <option value="B">Batch B</option>
                  <option value="C">Batch C</option>
                </select>
              </div>
            </>
          )}

          {viewType === 'faculty' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Faculty
              </label>
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Dr. Sharma">Dr. Sharma</option>
                <option value="Prof. Patel">Prof. Patel</option>
                <option value="Dr. Kumar">Dr. Kumar</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Current View Info */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          {viewType === 'year' && <BookOpen className="h-5 w-5 text-blue-600" />}
          {viewType === 'batch' && <Users className="h-5 w-5 text-green-600" />}
          {viewType === 'faculty' && <Calendar className="h-5 w-5 text-purple-600" />}
          <div>
            <h3 className="font-semibold text-gray-900">
              {viewType === 'year' && `${selectedYear} - Theory Classes (All Batches)`}
              {viewType === 'batch' && `${selectedYear}-${selectedBatch} - Complete Schedule`}
              {viewType === 'faculty' && `${selectedFaculty} - Teaching Schedule`}
            </h3>
            <p className="text-sm text-gray-600">
              {viewType === 'year' && 'Shows theory lectures for the entire year'}
              {viewType === 'batch' && 'Shows both theory and lab sessions for selected batch'}
              {viewType === 'faculty' && 'Shows all assigned classes and labs'}
            </p>
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      {renderTimetableGrid()}

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Legend</h4>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
            <span className="text-sm text-gray-600">Theory Class</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
            <span className="text-sm text-gray-600">Lab Session</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span className="text-sm text-gray-600">Break/Free Period</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;