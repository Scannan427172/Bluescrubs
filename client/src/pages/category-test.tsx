import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CategoryTest() {
  const [selectedCategory, setSelectedCategory] = useState<string>('dermatology');
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const categories = [
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'cardiovascular', label: 'Cardiovascular' },
    { value: 'infectious-diseases', label: 'Infectious Diseases' },
    { value: 'all', label: 'All Categories' }
  ];

  const loadQuestions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const url = `/api/test/questions?category=${selectedCategory}&count=10`;
      console.log('Fetching from URL:', url);
      console.log('Selected category:', selectedCategory);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to load questions');
      }
      
      const data = await response.json();
      console.log('Received questions:', data);
      
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Category Filtering Test Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Category:
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={loadQuestions} 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Loading...' : 'Load Questions'}
              </Button>
              
              <div className="text-sm text-gray-600">
                Current selection: <strong>{selectedCategory}</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        {questions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Questions ({questions.length} found)
            </h2>
            
            {questions.map((question, index) => (
              <Card key={question.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}: {question.topic}
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    Category: <span className="font-medium">{question.category}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{question.question}</p>
                  
                  <div className="space-y-2">
                    {Object.entries(question.options || {}).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-2">
                        <span className="font-medium text-gray-700 min-w-[24px]">
                          {key}:
                        </span>
                        <span>{value as string}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 rounded">
                    <p className="text-sm text-green-800">
                      <strong>Correct Answer:</strong> {question.answer}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      {question.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}