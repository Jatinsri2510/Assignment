import { Artist, Category, BookingRequest } from '@/types';

export const categories: Category[] = [
    {
        id: '1',
        name: 'Singers',
        description: 'Professional vocalists for all occasions',
        icon: '🎤'
    },
    {
        id: '2',
        name: 'Dancers',
        description: 'Talented performers for entertainment',
        icon: '💃'
    },
    {
        id: '3',
        name: 'Speakers',
        description: 'Motivational and keynote speakers',
        icon: '🎤'
    },
    {
        id: '4',
        name: 'DJs',
        description: 'Music mixing and entertainment',
        icon: '🎧'
    }
];

export const artists: Artist[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        category: ['Singers'],
        bio: 'Professional vocalist with 10+ years of experience in jazz and contemporary music.',
        languages: ['English', 'Spanish'],
        feeRange: '$500-$1000',
        location: 'New York, NY',
        imageUrl: '/api/placeholder/300/300',
        rating: 4.8,
        experience: '10+ years'
    },
    {
        id: '2',
        name: 'Michael Chen',
        category: ['Dancers'],
        bio: 'Contemporary dancer specializing in modern and hip-hop styles.',
        languages: ['English', 'Mandarin'],
        feeRange: '$300-$800',
        location: 'Los Angeles, CA',
        imageUrl: '/api/placeholder/300/300',
        rating: 4.6,
        experience: '8+ years'
    },
    {
        id: '3',
        name: 'Emma Rodriguez',
        category: ['Speakers'],
        bio: 'Motivational speaker and leadership coach with expertise in corporate events.',
        languages: ['English', 'Spanish'],
        feeRange: '$1000-$2500',
        location: 'Miami, FL',
        imageUrl: '/api/placeholder/300/300',
        rating: 4.9,
        experience: '15+ years'
    },
    {
        id: '4',
        name: 'DJ Alex',
        category: ['DJs'],
        bio: 'Professional DJ with expertise in electronic, hip-hop, and pop music.',
        languages: ['English'],
        feeRange: '$400-$1200',
        location: 'Chicago, IL',
        imageUrl: '/api/placeholder/300/300',
        rating: 4.7,
        experience: '12+ years'
    },
    {
        id: '5',
        name: 'Priya Patel',
        category: ['Singers', 'Dancers'],
        bio: 'Multi-talented performer specializing in Bollywood and fusion performances.',
        languages: ['English', 'Hindi', 'Gujarati'],
        feeRange: '$600-$1500',
        location: 'Houston, TX',
        imageUrl: '/api/placeholder/300/300',
        rating: 4.8,
        experience: '9+ years'
    },
    {
        id: '6',
        name: 'David Kim',
        category: ['Speakers'],
        bio: 'Tech industry speaker and startup consultant with engaging presentation style.',
        languages: ['English', 'Korean'],
        feeRange: '$800-$2000',
        location: 'San Francisco, CA',
        imageUrl: '/api/placeholder/300/300',
        rating: 4.5,
        experience: '7+ years'
    }
];

export const bookingRequests: BookingRequest[] = [
    {
        id: '1',
        artistName: 'Sarah Johnson',
        category: ['Singers'],
        location: 'New York, NY',
        feeRange: '$500-$1000',
        status: 'pending',
        requestDate: '2024-01-15'
    },
    {
        id: '2',
        artistName: 'Michael Chen',
        category: ['Dancers'],
        location: 'Los Angeles, CA',
        feeRange: '$300-$800',
        status: 'approved',
        requestDate: '2024-01-14'
    },
    {
        id: '3',
        artistName: 'Emma Rodriguez',
        category: ['Speakers'],
        location: 'Miami, FL',
        feeRange: '$1000-$2500',
        status: 'rejected',
        requestDate: '2024-01-13'
    }
];

export const locations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Miami, FL',
    'Houston, TX',
    'San Francisco, CA',
    'Boston, MA',
    'Seattle, WA'
];

export const feeRanges = [
    '$100-$300',
    '$300-$600',
    '$600-$1000',
    '$1000-$2000',
    '$2000+'
];

export const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese',
    'Japanese',
    'Korean',
    'Hindi',
    'Arabic'
]; 