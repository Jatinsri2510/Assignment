'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { categories, languages, feeRanges } from '@/data/mockData';
import { FormData } from '@/types';
import { CheckCircle, Upload, ArrowRight, ArrowLeft } from 'lucide-react';

// Form validation schema
const schema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    bio: yup.string().required('Bio is required').min(50, 'Bio must be at least 50 characters'),
    category: yup.array().min(1, 'Please select at least one category').required('Category is required'),
    languages: yup.array().min(1, 'Please select at least one language').required('Languages are required'),
    feeRange: yup.string().required('Fee range is required'),
    location: yup.string().required('Location is required').min(2, 'Location must be at least 2 characters'),
    imageUrl: yup.string().optional(),
}).required();

export default function OnboardPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const watchedCategory = watch('category', []);
    const watchedLanguages = watch('languages', []);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', data);
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const toggleCategory = (category: string) => {
        const currentCategories = watchedCategory || [];
        const updatedCategories = currentCategories.includes(category)
            ? currentCategories.filter(c => c !== category)
            : [...currentCategories, category];
        setValue('category', updatedCategories);
    };

    const toggleLanguage = (language: string) => {
        const currentLanguages = watchedLanguages || [];
        const updatedLanguages = currentLanguages.includes(language)
            ? currentLanguages.filter(l => l !== language)
            : [...currentLanguages, language];
        setValue('languages', updatedLanguages);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="text-center py-12">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for submitting your artist profile. We'll review your application and get back to you within 2-3 business days.
                        </p>
                        <Button
                            onClick={() => {
                                setIsSubmitted(false);
                                setCurrentStep(1);
                            }}
                            className="w-full"
                        >
                            Submit Another Application
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Onboard Your Artist
                    </h1>
                    <p className="text-lg text-gray-600">
                        Join our platform and connect with event planners worldwide
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>Basic Info</span>
                        <span>Categories & Languages</span>
                        <span>Pricing & Location</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardContent className="p-6">
                            {/* Step 1: Basic Information */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
                                        <p className="text-gray-600 mb-6">Tell us about the artist</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Artist Name *
                                        </label>
                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    placeholder="Enter artist name"
                                                />
                                            )}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bio *
                                        </label>
                                        <Controller
                                            name="bio"
                                            control={control}
                                            render={({ field }) => (
                                                <textarea
                                                    {...field}
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    placeholder="Tell us about the artist's background, experience, and specialties..."
                                                />
                                            )}
                                        />
                                        {errors.bio && (
                                            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Profile Image (Optional)
                                        </label>
                                        <Controller
                                            name="imageUrl"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                                    <p className="text-gray-600">Click to upload or drag and drop</p>
                                                    <input
                                                        {...field}
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Categories and Languages */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Categories & Languages</h3>
                                        <p className="text-gray-600 mb-6">Select the artist's specialties and languages</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Categories *
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {categories.map((category) => (
                                                <label
                                                    key={category.id}
                                                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${watchedCategory?.includes(category.name)
                                                            ? 'border-purple-500 bg-purple-50'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={watchedCategory?.includes(category.name) || false}
                                                        onChange={() => toggleCategory(category.name)}
                                                        className="sr-only"
                                                    />
                                                    <div className="text-2xl mr-3">{category.icon}</div>
                                                    <div>
                                                        <div className="font-medium">{category.name}</div>
                                                        <div className="text-sm text-gray-600">{category.description}</div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.category && (
                                            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Languages Spoken *
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {languages.map((language) => (
                                                <label
                                                    key={language}
                                                    className={`flex items-center p-2 border rounded cursor-pointer transition-colors ${watchedLanguages?.includes(language)
                                                            ? 'border-purple-500 bg-purple-50'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={watchedLanguages?.includes(language) || false}
                                                        onChange={() => toggleLanguage(language)}
                                                        className="sr-only"
                                                    />
                                                    <span className="text-sm">{language}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.languages && (
                                            <p className="text-red-500 text-sm mt-1">{errors.languages.message}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Pricing and Location */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Pricing & Location</h3>
                                        <p className="text-gray-600 mb-6">Set your pricing and location details</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Fee Range *
                                        </label>
                                        <Controller
                                            name="feeRange"
                                            control={control}
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                >
                                                    <option value="">Select fee range</option>
                                                    {feeRanges.map((range) => (
                                                        <option key={range} value={range}>
                                                            {range}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        />
                                        {errors.feeRange && (
                                            <p className="text-red-500 text-sm mt-1">{errors.feeRange.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location *
                                        </label>
                                        <Controller
                                            name="location"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    placeholder="e.g., New York, NY"
                                                />
                                            )}
                                        />
                                        {errors.location && (
                                            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                {currentStep < 3 ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                                    >
                                        Next
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
} 