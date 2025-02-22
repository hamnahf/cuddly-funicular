
// app/page.tsx
'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MindMap from '@/components/MindMap';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const queryClient = new QueryClient();

export default function Home() {
  const [currentMindMapId, setCurrentMindMapId] = useState<string | null>(null);
  const [maps, setMaps] = useState<{ id: string; title: string }[]>([]);
  const [showNewMapDialog, setShowNewMapDialog] = useState(false);
  const [newMapTitle, setNewMapTitle] = useState('');

  const createNewMindMap = async () => {
    try {
      const response = await fetch('/api/mindmaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newMapTitle,
          userId: 'user123', // Replace with actual user ID from authentication
        }),
      });
      
      const newMap = await response.json();
      setMaps([...maps, newMap]);
      setCurrentMindMapId(newMap.id);
      setShowNewMapDialog(false);
      setNewMapTitle('');
    } catch (error) {
      console.error('Failed to create mind map:', error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Mind Map Creator</h1>
              <button
                onClick={() => setShowNewMapDialog(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create New Map
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {showNewMapDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Card className="w-96">
                <CardHeader>
                  <CardTitle>Create New Mind Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <input
                    type="text"
                    value={newMapTitle}
                    onChange={(e) => setNewMapTitle(e.target.value)}
                    placeholder="Enter mind map title"
                    className="w-full p-2 border rounded mb-4"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowNewMapDialog(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createNewMindMap}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Create
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!currentMindMapId ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {maps.map((map) => (
                <Card
                  key={map.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setCurrentMindMapId(map.id)}
                >
                  <CardHeader>
                    <CardTitle>{map.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setCurrentMindMapId(null)}
                className="mb-4 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ← Back to Maps
              </button>
              <MindMap id={currentMindMapId} />
            </div>
          )}
        </main>
      </div>
    </QueryClientProvider>
  );
}
