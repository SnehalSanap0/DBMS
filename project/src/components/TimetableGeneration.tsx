import React, { useState } from 'react';
import { Play, Settings, AlertCircle, CheckCircle, Clock, Calendar } from 'lucide-react';

interface GenerationConfig {
  semester: number;
  prioritizeLabAfternoon: boolean;
  allowBackToBackTheory: boolean;
  maxConsecutiveHours: number;
  breakDuration: number;
  preferredStartTime: string;
}

const TimetableGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [config, setConfig] = useState<GenerationConfig>({
    semester: 3,
    prioritizeLabAfternoon: true,
    allowBackToBackTheory: false,
    maxConsecutiveHours: 3,
    breakDuration: 15,
    preferredStartTime: '8:00',
  });

  const [conflicts, setConflicts] = useState([
    {
      type: 'warning',
      message: 'Dr. Sharma has 5 hours scheduled on Monday (exceeds preference of 4 hours)',
      severity: 'medium',
    },
    {
      type: 'info',
      message: 'Lab utilization at 87% - consider adding more lab sessions',
      severity: 'low',
    },
  ]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStatus('running');
    
    // Simulate timetable generation process
    setTimeout(() => {
      setGenerationStatus('success');
      setLastGenerated(new Date());
      setIsGenerating(false);
      
      // Clear previous conflicts and add new ones based on generation
      setConflicts([
        {
          type: 'success',
          message: 'Timetable generated successfully for all batches',
          severity: 'low',
        },
        {
          type: 'warning',
          message: 'Minor optimization: 2 faculty members slightly exceed preferred hours',
          severity: 'medium',
        },
      ]);
    }, 3000);
  };

  const getStatusIcon = () => {
    switch (generationStatus) {
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (generationStatus) {
      case 'running':
        return 'Generating timetable...';
      case 'success':
        return 'Timetable generated successfully';
      case 'error':
        return 'Generation failed';
      default:
        return 'Ready to generate';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Timetable Generation</h2>
        <p className="text-gray-600 mt-1">
          Configure constraints and generate optimized timetables
        </p>
      </div>

      {/* Generation Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Generation Status</h3>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${
              generationStatus === 'success' ? 'text-green-600' :
              generationStatus === 'error' ? 'text-red-600' :
              generationStatus === 'running' ? 'text-blue-600' :
              'text-gray-500'
            }`}>
              {getStatusText()}
            </span>
          </div>
        </div>

        {lastGenerated && (
          <p className="text-sm text-gray-600 mb-4">
            Last generated: {lastGenerated.toLocaleString()}
          </p>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isGenerating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Play className="h-5 w-5" />
          <span>{isGenerating ? 'Generating...' : 'Generate Timetable'}</span>
        </button>
      </div>

      {/* Configuration Panel */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Settings className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Generation Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                value={config.semester}
                onChange={(e) => setConfig({ ...config, semester: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>Semester 1</option>
                <option value={2}>Semester 2</option>
                <option value={3}>Semester 3</option>
                <option value={4}>Semester 4</option>
                <option value={5}>Semester 5</option>
                <option value={6}>Semester 6</option>
                <option value={7}>Semester 7</option>
                <option value={8}>Semester 8</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Start Time
              </label>
              <select
                value={config.preferredStartTime}
                onChange={(e) => setConfig({ ...config, preferredStartTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="8:00">8:00 AM</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Consecutive Hours
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={config.maxConsecutiveHours}
                onChange={(e) => setConfig({ ...config, maxConsecutiveHours: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.prioritizeLabAfternoon}
                  onChange={(e) => setConfig({ ...config, prioritizeLabAfternoon: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Prioritize labs in afternoon slots
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.allowBackToBackTheory}
                  onChange={(e) => setConfig({ ...config, allowBackToBackTheory: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Allow back-to-back theory sessions
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Break Duration (minutes)
              </label>
              <input
                type="number"
                min="10"
                max="30"
                value={config.breakDuration}
                onChange={(e) => setConfig({ ...config, breakDuration: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conflicts and Warnings */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conflicts & Warnings</h3>
        
        {conflicts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600">No conflicts detected</p>
          </div>
        ) : (
          <div className="space-y-3">
            {conflicts.map((conflict, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  conflict.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  conflict.type === 'error' ? 'bg-red-50 border-red-400' :
                  conflict.type === 'success' ? 'bg-green-50 border-green-400' :
                  'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`h-5 w-5 mt-0.5 ${
                    conflict.type === 'warning' ? 'text-yellow-600' :
                    conflict.type === 'error' ? 'text-red-600' :
                    conflict.type === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                  <div>
                    <p className={`text-sm font-medium ${
                      conflict.type === 'warning' ? 'text-yellow-800' :
                      conflict.type === 'error' ? 'text-red-800' :
                      conflict.type === 'success' ? 'text-green-800' :
                      'text-blue-800'
                    }`}>
                      {conflict.message}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Severity: {conflict.severity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Generation Progress */}
      {isGenerating && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Analyzing constraints...</span>
              <span className="text-green-600">Complete</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Generating theory schedules...</span>
              <span className="text-green-600">Complete</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Optimizing lab assignments...</span>
              <span className="text-blue-600">In Progress</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Validating conflicts...</span>
              <span className="text-gray-400">Pending</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-blue-600 h-2 rounded-full w-3/4 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableGeneration;