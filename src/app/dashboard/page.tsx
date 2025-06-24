'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { bookingRequests } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Eye, CheckCircle, XCircle, Clock, Filter, Search } from 'lucide-react';
import { BookingRequest } from '@/types';

export default function DashboardPage() {
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [requests, setRequests] = useState<BookingRequest[]>(bookingRequests);
    const [isProcessing, setIsProcessing] = useState<string | null>(null);

    // Filter and search requests
    const filteredRequests = requests.filter(request => {
        const statusMatch = filterStatus === 'all' || request.status === filterStatus;
        const searchMatch = request.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.location.toLowerCase().includes(searchTerm.toLowerCase());
        return statusMatch && searchMatch;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-4 w-4" />;
            case 'approved':
                return <CheckCircle className="h-4 w-4" />;
            case 'rejected':
                return <XCircle className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const getStatusCount = (status: string) => {
        return requests.filter(request => request.status === status).length;
    };

    // Handle approve action
    const handleApprove = async (requestId: string) => {
        setIsProcessing(requestId);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setRequests(prev =>
            prev.map(request =>
                request.id === requestId
                    ? { ...request, status: 'approved' as const }
                    : request
            )
        );

        setIsProcessing(null);
    };

    // Handle reject action
    const handleReject = async (requestId: string) => {
        setIsProcessing(requestId);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setRequests(prev =>
            prev.map(request =>
                request.id === requestId
                    ? { ...request, status: 'rejected' as const }
                    : request
            )
        );

        setIsProcessing(null);
    };

    // Handle view details
    const handleViewDetails = (request: BookingRequest) => {
        alert(`Viewing details for ${request.artistName}\n\nCategory: ${request.category.join(', ')}\nLocation: ${request.location}\nFee Range: ${request.feeRange}\nStatus: ${request.status}\nRequest Date: ${formatDate(request.requestDate)}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Manager Dashboard
                    </h1>
                    <p className="text-lg text-gray-700 font-medium">
                        Manage artist submissions and booking requests
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Total Requests</p>
                                    <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                                </div>
                                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Pending</p>
                                    <p className="text-2xl font-bold text-yellow-600">{getStatusCount('pending')}</p>
                                </div>
                                <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-yellow-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Approved</p>
                                    <p className="text-2xl font-bold text-green-600">{getStatusCount('approved')}</p>
                                </div>
                                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Rejected</p>
                                    <p className="text-2xl font-bold text-red-600">{getStatusCount('rejected')}</p>
                                </div>
                                <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center">
                                    <XCircle className="h-4 w-4 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search by artist name or location..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 font-medium"
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-600" />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 font-medium"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Requests Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-gray-900 font-bold">Artist Submissions</CardTitle>
                        <CardDescription className="text-gray-700 font-medium">
                            Manage and review artist booking requests
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-bold text-gray-900">Artist Name</th>
                                        <th className="text-left py-3 px-4 font-bold text-gray-900">Category</th>
                                        <th className="text-left py-3 px-4 font-bold text-gray-900">Location</th>
                                        <th className="text-left py-3 px-4 font-bold text-gray-900">Fee Range</th>
                                        <th className="text-left py-3 px-4 font-bold text-gray-900">Request Date</th>
                                        <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                                        <th className="text-left py-3 px-4 font-bold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.map((request) => (
                                        <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div className="font-bold text-gray-900">{request.artistName}</div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {request.category.map((cat) => (
                                                        <span
                                                            key={cat}
                                                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-bold"
                                                        >
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-800 font-semibold">{request.location}</td>
                                            <td className="py-4 px-4 text-gray-800 font-semibold">{request.feeRange}</td>
                                            <td className="py-4 px-4 text-gray-800 font-semibold">{formatDate(request.requestDate)}</td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(request.status)}`}>
                                                    {getStatusIcon(request.status)}
                                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex items-center gap-1 border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold"
                                                        onClick={() => handleViewDetails(request)}
                                                    >
                                                        <Eye className="h-3 w-3" />
                                                        View
                                                    </Button>
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 font-semibold"
                                                                onClick={() => handleApprove(request.id)}
                                                                disabled={isProcessing === request.id}
                                                            >
                                                                {isProcessing === request.id ? (
                                                                    <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                ) : (
                                                                    <CheckCircle className="h-3 w-3" />
                                                                )}
                                                                {isProcessing === request.id ? 'Processing...' : 'Approve'}
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 font-semibold"
                                                                onClick={() => handleReject(request.id)}
                                                                disabled={isProcessing === request.id}
                                                            >
                                                                {isProcessing === request.id ? (
                                                                    <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                ) : (
                                                                    <XCircle className="h-3 w-3" />
                                                                )}
                                                                {isProcessing === request.id ? 'Processing...' : 'Reject'}
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* No Results */}
                            {filteredRequests.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-700 text-lg mb-4 font-bold">
                                        No requests found matching your criteria
                                    </p>
                                    <Button
                                        onClick={() => {
                                            setFilterStatus('all');
                                            setSearchTerm('');
                                        }}
                                        variant="outline"
                                        className="border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold"
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Mobile View - Cards instead of table */}
                <div className="md:hidden mt-6 space-y-4">
                    {filteredRequests.map((request) => (
                        <Card key={request.id}>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{request.artistName}</h3>
                                            <p className="text-sm text-gray-700 font-semibold">{request.location}</p>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(request.status)}`}>
                                            {getStatusIcon(request.status)}
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {request.category.map((cat) => (
                                            <span
                                                key={cat}
                                                className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-bold"
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-800 font-semibold">
                                        <span>{request.feeRange}</span>
                                        <span>{formatDate(request.requestDate)}</span>
                                    </div>

                                    <div className="flex items-center gap-2 pt-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex items-center gap-1 flex-1 border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold"
                                            onClick={() => handleViewDetails(request)}
                                        >
                                            <Eye className="h-3 w-3" />
                                            View Details
                                        </Button>
                                        {request.status === 'pending' && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 flex-1 font-semibold"
                                                    onClick={() => handleApprove(request.id)}
                                                    disabled={isProcessing === request.id}
                                                >
                                                    {isProcessing === request.id ? (
                                                        <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <CheckCircle className="h-3 w-3" />
                                                    )}
                                                    {isProcessing === request.id ? 'Processing...' : 'Approve'}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 flex-1 font-semibold"
                                                    onClick={() => handleReject(request.id)}
                                                    disabled={isProcessing === request.id}
                                                >
                                                    {isProcessing === request.id ? (
                                                        <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <XCircle className="h-3 w-3" />
                                                    )}
                                                    {isProcessing === request.id ? 'Processing...' : 'Reject'}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
} 