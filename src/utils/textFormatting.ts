// Remove markdown symbols and format text for display
export function formatAIResponse(text: string): string {
  return text
    // Headers
    .replace(/###\s?/g, '<h3 class="text-2xl font-bold mt-8 mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">')
    .replace(/##\s?/g, '<h2 class="text-3xl font-bold mt-10 mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">')
    .replace(/#\s?/g, '<h1 class="text-4xl font-bold mt-12 mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">')
    
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-red-500">$1</strong>')
    
    // Lists
    .replace(/^\s*[-*]\s+(.+)$/gm, '<li class="flex items-center space-x-2 mb-2"><span class="w-2 h-2 bg-red-500/30 rounded-full"></span><span>$1</span></li>')
    
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-300">')
    
    // Line breaks
    .replace(/\n/g, '<br />')
    
    // Wrap in container
    .replace(/^(.+)$/, '<div class="space-y-6"><p class="mb-4 leading-relaxed text-gray-300">$1</p></div>')
    .trim();
}