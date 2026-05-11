import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';

const ViewProfile = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('Token');
            if (!token) {
                setError("Session expired. Please login again.");
                setLoading(false);
                return;
            }

            try {
                // const response = await fetch('http://localhost:5000/v1/user/profile', {
                const response = await fetch('https://chatbot-f4ah.onrender.com/v1/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Could not fetch profile data');
                const result = await response.json();
                setData(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    );

    if (error) return (
        <Container className="mt-5"><Alert variant="danger" className="border-0 shadow-sm">{error}</Alert></Container>
    );

    // Reusable component for the data cards
    const InfoBox = ({ label, value }) => (
        <div className="p-4 rounded-3 h-100" style={{ backgroundColor: '#f9f9fb', border: '1px solid #eee' }}>
            <label className="d-block text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                {label}
            </label>
            <div className="fs-5 text-dark" style={{ wordBreak: 'break-word' }}>
                {value || 'Not Provided'}
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            {/* 1. Header Section - Fixed Overlap Issues */}
            <div className="border-bottom bg-white py-5 mb-5">
                <Container>
                    <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                        {/* Profile Icon */}
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm flex-shrink-0" 
                             style={{ width: '90px', height: '90px', fontSize: '2.2rem', fontWeight: '600' }}>
                            {data?.name?.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* Identity - Will not overlap because of flex gap */}
                        <div className="text-center text-md-start">
                            <h1 className="fw-bold mb-1" style={{ fontSize: '2.5rem' }}>{data?.name}</h1>
                            <p className="text-muted fs-5 mb-0">{data?.email}</p>
                        </div>

                        {/* Edit Button - Pushed to the right on desktop */}
                        <div className="ms-md-auto mt-3 mt-md-0">
                            <Button 
                                variant="primary" 
                                size="lg"
                                className="px-5 rounded-pill shadow-sm"
                                onClick={() => window.location.href = '/profile'}
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>

            {/* 2. Main Body Grid */}
            <Container className="pb-5">
                <h4 className="fw-light text-muted mb-4 px-2">Account Details</h4>
                <Row className="g-4">
                    {/* Row 1 */}
                    <Col lg={4} md={6}><InfoBox label="Full Name" value={data?.name} /></Col>
                    <Col lg={4} md={6}><InfoBox label="Email Address" value={data?.email} /></Col>
                    <Col lg={4} md={6}><InfoBox label="Annual Income" value={data?.profile?.dateOfBirth ? new Date(data.profile.dateOfBirth).toLocaleDateString() : 'Not Provided'} /></Col>

                    {/* Row 2 */}
                    <Col lg={4} md={6}><InfoBox label="Education" value={data?.profile?.education} /></Col>
                    <Col lg={4} md={6}><InfoBox label="Occupation" value={data?.profile?.occupation} /></Col>
                    <Col lg={4} md={6}><InfoBox label="Annual Income" value={data?.profile?.income} /></Col>

                    {/* Row 3 */}
                    <Col lg={4} md={6}><InfoBox label="Category" value={data?.profile?.category} /></Col>
                    <Col lg={4} md={6}><InfoBox label="State" value={data?.profile?.state} /></Col>
                    <Col lg={4} md={6}><InfoBox label="Region" value={data?.profile?.ruralUrban} /></Col>
                </Row>

                {/* 3. Bottom Navigation - Centered at the end */}
                {/* <div className="text-center mt-5 pt-5 border-top">
                    <Button 
                        variant="link" 
                        className="text-decoration-none text-secondary py-3"
                        onClick={() => window.history.back()}
                    >
                        <span className="me-2">←</span> Return to Previous Page
                    </Button>
                </div> */}
            </Container>
        </div>
    );
};

export default ViewProfile;
