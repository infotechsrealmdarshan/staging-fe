import React, { Component } from 'react';
import './Home.css';
import MyStragings from './MyStragings';
import StragingUpload from './StragingUpload';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user || null,
            currentView: 'overview', // overview, stragings, upload
            searchQuery: ''
        };
    }

    componentDidMount() {
        // No need to load static projects anymore
    }

    handleViewStragings = () => {
        this.setState({ currentView: 'stragings' });
        if (this.props.onViewStragings) {
            this.props.onViewStragings();
        }
    }

    handleCreateStraging = () => {
        this.setState({ currentView: 'upload' });
        if (this.props.onCreateStraging) {
            this.props.onCreateStraging();
        }
    }

    handleBackToOverview = () => {
        this.setState({ currentView: 'overview' });
    }

    handleSearch = (e) => {
        this.setState({ searchQuery: e.target.value });
    }

    render() {
        const { user, currentView, searchQuery } = this.state;

        // If not in overview view, render the appropriate component
        if (currentView === 'stragings') {
            return (
                <div className="home-container">
                    <MyStragings 
                        onViewStraging={this.props.onViewStraging}
                        onEditStraging={this.props.onEditStraging}
                        onCreateNew={this.handleCreateStraging}
                    />
                </div>
            );
        }

        if (currentView === 'upload') {
            return (
                <div className="home-container">
                    <StragingUpload 
                        onUploadSuccess={this.handleViewStragings}
                        onCancel={this.handleBackToOverview}
                    />
                </div>
            );
        }

        return (
            <div className="home-container">
                {/* Header */}
                <header className="home-header">
                    <div className="header-left">
                        <div className="logo">
                            <div className="logo-icon">🌐</div>
                            <h1>Virtual Tour Creator</h1>
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search stragings..."
                                value={searchQuery}
                                onChange={this.handleSearch}
                            />
                            <span className="search-icon">🔍</span>
                        </div>

                        <div className="user-menu">
                            <div className="user-avatar">
                                <span>{user?.fullName?.[0] || user?.email?.[0] || 'U'}</span>
                            </div>
                            <div className="user-dropdown">
                                <div className="user-info">
                                    <p className="user-name">{user?.fullName || user?.email}</p>
                                    <p className="user-email">{user?.email}</p>
                                </div>
                                <div className="dropdown-menu">
                                    <button className="menu-item">⚙️ Settings</button>
                                    <button className="menu-item">📊 Analytics</button>
                                    <button className="menu-item">❓ Help</button>
                                    <button
                                        className="menu-item logout"
                                        onClick={this.props.onSignOut}
                                    >
                                        🚪 Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="home-main">
                    <div className="content-header">
                        <div>
                            <h2>Welcome to Virtual Tour Creator</h2>
                            <p>Create and manage your virtual staging projects</p>
                        </div>
                        <div className="header-buttons">
                            <button
                                className="straging-btn primary"
                                onClick={this.handleViewStragings}
                            >
                                <span className="view-icon">📋</span>
                                View My Stragings
                            </button>
                            <button
                                className="straging-btn secondary"
                                onClick={this.handleCreateStraging}
                            >
                                <span className="plus-icon">+</span>
                                Create New Straging
                            </button>
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className="overview-section">
                        <div className="overview-cards">
                            <div className="overview-card" onClick={this.handleViewStragings}>
                                <div className="card-icon">📋</div>
                                <h3>My Stragings</h3>
                                <p>View and manage all your virtual staging projects</p>
                                <button className="card-btn">View All</button>
                            </div>

                            <div className="overview-card" onClick={this.handleCreateStraging}>
                                <div className="card-icon">➕</div>
                                <h3>Create New</h3>
                                <p>Start a new virtual staging project with images</p>
                                <button className="card-btn">Create Now</button>
                            </div>

                            <div className="overview-card">
                                <div className="card-icon">📊</div>
                                <h3>Analytics</h3>
                                <p>Track performance and engagement of your tours</p>
                                <button className="card-btn">Coming Soon</button>
                            </div>

                            <div className="overview-card">
                                <div className="card-icon">🎯</div>
                                <h3>Tutorials</h3>
                                <p>Learn how to create amazing virtual tours</p>
                                <button className="card-btn">Learn More</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;
