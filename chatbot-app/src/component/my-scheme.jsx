import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Badge, Spinner, Alert } from 'react-bootstrap';

const MySchemes = () => {
    // State to hold the schemes data
    const [schemes, setSchemes] = useState([]);
    // State to manage the loading spinner
    const [isLoading, setIsLoading] = useState(true);
    // State to display any fetch errors
    const [error, setError] = useState(null);

    // useEffect to fetch data on component mount
    useEffect(() => {
        const fetchSchemes = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch from your backend API
                // NOTE: In production, you'd likely use an environment variable for the base URL
                const response = await fetch('http://localhost:5000/v1/schemes/related-schemes',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include auth token if your API requires it       
                       Authorization: `Bearer ${localStorage.getItem("Token")}`
                }});

                if (!response.ok) {
                    // If response is not ok (e.g., 404, 500), throw an error to be caught below
                    throw new Error(`Could not fetch data, status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched schemes:", data);
                // The API returns an object with a 'schemes' array. Let's store that array.
                setSchemes(data.schemes || []);
            } catch (err) {
                console.error("Error fetching schemes:", err);
                setError("Failed to load schemes. Please check your connection or try again later.");
            } finally {
                // No matter what, stop the loading spinner
                setIsLoading(false);
            }
        };

        fetchSchemes();
    }, []); // Empty dependency array means this runs only once

    // Function to determine badge color based on category
    const getBadgeVariant = (category) => {
        switch (category.toLowerCase()) {
            case 'housing': return 'info';
            case 'agriculture': return 'success';
            case 'women and child': return 'danger';
            case 'health': return 'warning';
            case 'business': return 'primary';
            case 'pension': return 'secondary';
            // Add more cases as needed for your categories
            default: return 'light'; // Fallback
        }
    };

    // 📍 Component-scoped CSS, embedded for a self-contained component
    const mySchemesStyles = `
/* Embedded styles for MySchemes component */

.my-schemes-container {
padding-top: 2rem;
padding-bottom: 3rem;
}

/* Base styles for the scheme cards */
.scheme-card {
border: 1px solid #e0e0e0; /* Light border */
border-radius: 12px; /* Curved corners */
transition: transform 0.2s ease, box-shadow 0.2s ease; /* Smooth transition for hover */
overflow: hidden; /* Prevent content from spilling out */
}

/* Hover effect: float the card up slightly */
.scheme-card:hover {
transform: translateY(-5px); /* Lift the card */
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Deeper shadow on hover */
}

/* Style the English scheme name */
.scheme-name-en {
font-size: 1.25rem;
color: #333;
}

/* Style the Hindi scheme name */
.scheme-name-hi {
font-size: 1rem;
font-weight: normal;
}

/* Style the ministry name */
.scheme-ministry {
border-bottom: 1px solid #eee; /* Light divider */
padding-bottom: 0.5rem;
}

/* Container for the badges */
.scheme-categories {
display: flex;
flex-wrap: wrap; /* Allow badges to wrap to next line */
gap: 0.25rem; /* Space between badges */
}

/* Style for each category badge */
.cat-badge {
font-size: 0.8rem;
padding: 0.4em 0.8em;
color: #fff; /* Ensure white text for colored badges */
}

/* Style for light badges - for readability */
.bg-light.cat-badge {
color: #555; /* Dark text for light badges */
border: 1px solid #ccc;
}

/* Style the eligibility/income text */
.scheme-eligibility {
color: #666;
border-top: 1px solid #eee; /* Light divider */
padding-top: 0.5rem;
}

/* Style the Apply button */
.apply-btn {
border-radius: 20px; /* Highly curved button corners */
padding: 8px 20px;
font-weight: 600;
width: 100%; /* Make button full width of card body */
}
`;

    return (
        <Container className="my-schemes-container">
            {/* Integrated Styles for this component */}
            <style>{mySchemesStyles}</style>
{/* 
            <h2 className="text-center mb-5">Explore Available Schemes</h2> */}

            {/* Show loading spinner while data is being fetched */}
            {isLoading && (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Loading schemes...</span>
                    </Spinner>
                </div>
            )}

            {/* Show error message if fetch fails */}
            {error && (
                <Alert variant="danger" className="text-center my-5">
                    {error}
                </Alert>
            )}

            {/* Show a message if no schemes are returned */}
            {!isLoading && !error && schemes.length === 0 && (
                <Alert variant="info" className="text-center my-5">
                    No related schemes found at this time.
                </Alert>
            )}

            {/* Render the schemes cards only when data is loaded, no error, and schemes exist */}
            {!isLoading && !error && schemes.length > 0 && (
                <Row xs={1} md={2} lg={3} className="g-4"> {/* Responsive Grid */}
                    {schemes.map((scheme) => (
                        <Col key={scheme._id}>
                            {/* Card component for each scheme */}
                            <Card className="h-100 scheme-card shadow-sm hvr-float">
                                <Card.Body className="d-flex flex-column">

                                    {/* Scheme Name (English) */}
                                    <Card.Title className="fw-bold mb-1 scheme-name-en">
                                        {scheme.schemeName.en}
                                    </Card.Title>

                                    {/* Scheme Name (Hindi) - smaller and muted */}
                                    <Card.Subtitle className="mb-3 text-muted scheme-name-hi">
                                        {scheme.schemeName.hi}
                                    </Card.Subtitle>

                                    {/* Ministry - with smaller font */}
                                    <Card.Text className="text-muted small mb-3 scheme-ministry">
                                        <i className="bi bi-building me-1"></i> {scheme.ministry}
                                    </Card.Text>

                                    {/* Categories as Badges */}
                                    <div className="mb-3 scheme-categories">
                                        {scheme.category.map((cat, index) => (
                                            <Badge
                                                key={index}
                                                pill
                                                bg={getBadgeVariant(cat)}
                                                className="me-1 mb-1 fw-normal cat-badge"
                                            >
                                                {cat}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Eligibility / Max Income */}
                                    <Card.Text className="small mt-auto scheme-eligibility"> {/* mt-auto pushes this to the bottom */}
                                        <strong>Eligibility (Max Income):</strong> ₹{scheme.eligibility.maxIncome.toLocaleString('en-IN')} / year
                                    </Card.Text>

                                    {/* Apply Button */}
                                    <Button
                                        variant="primary"
                                        href={scheme.applyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 apply-btn"
                                    >
                                        Apply Now <i className="bi bi-arrow-right me-1"></i>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default MySchemes;