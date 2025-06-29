document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Profile dropdown elements
    const userProfile = document.querySelector('.user-profile-info');
    const userDropdown = document.querySelector('.user-dropdown-menu');
    const profileArrow = document.querySelector('.profile-toggle-arrow');

    // Search dropdown elements
    const searchMenu = document.querySelector('.search-menu');
    const searchDropdown = document.querySelector('.search-dropdown');

    // ===== HAMBURGER MENU TOGGLE =====
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
        
        // Close profile dropdown if open
        userDropdown.classList.remove('active');
        if (profileArrow) {
            profileArrow.classList.remove('fa-chevron-up');
            profileArrow.classList.add('fa-chevron-down');
        }
    });

    // Replace the profile dropdown section in your existing JS with this:

// ===== PROFILE DROPDOWN =====
// Desktop Hover Behavior
if (window.innerWidth > 768) {
    userProfile.addEventListener('mouseenter', function() {
        userDropdown.style.display = 'block';
        setTimeout(() => {
            userDropdown.style.opacity = '1';
            userDropdown.style.visibility = 'visible';
            userDropdown.style.transform = 'translateY(0)';
        }, 10);
    });

    userProfile.addEventListener('mouseleave', function() {
        userDropdown.style.opacity = '0';
        userDropdown.style.visibility = 'hidden';
        userDropdown.style.transform = 'translateY(10px)';
        setTimeout(() => {
            userDropdown.style.display = 'none';
        }, 300);
    });
}

// Mobile Click Behavior (keep existing)
userProfile.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        e.stopPropagation();
        e.preventDefault();
        userDropdown.classList.toggle('active');
        if (profileArrow) {
            profileArrow.classList.toggle('fa-chevron-down');
            profileArrow.classList.toggle('fa-chevron-up');
        }
    }
});

    // // ===== PROFILE DROPDOWN =====
    // // Desktop Hover Behavior
    // userProfile.addEventListener('mouseenter', function() {
    //     if (window.innerWidth > 768) {
    //         userDropdown.style.display = 'block';
    //         setTimeout(() => {
    //             userDropdown.style.opacity = '1';
    //             userDropdown.style.visibility = 'visible';
    //             userDropdown.style.transform = 'translateY(0)';
    //         }, 10);
    //     }
    // });

    // userProfile.addEventListener('mouseleave', function() {
    //     if (window.innerWidth > 768) {
    //         userDropdown.style.opacity = '0';
    //         userDropdown.style.visibility = 'hidden';
    //         userDropdown.style.transform = 'translateY(10px)';
    //         setTimeout(() => {
    //             userDropdown.style.display = 'none';
    //         }, 300);
    //     }
    // });

    // // Mobile Click Behavior
    // userProfile.addEventListener('click', function(e) {
    //     if (window.innerWidth <= 768) {
    //         e.stopPropagation();
    //         e.preventDefault();
    //         userDropdown.classList.toggle('active');
    //         if (profileArrow) {
    //             profileArrow.classList.toggle('fa-chevron-down');
    //             profileArrow.classList.toggle('fa-chevron-up');
    //         }
    //     }
    // });

    // ===== SEARCH DROPDOWN =====
    if (searchMenu && searchDropdown) {
        // Desktop Hover
        if (window.innerWidth > 768) {
            searchMenu.addEventListener('mouseenter', () => {
                searchDropdown.style.display = 'block';
            });
            searchMenu.addEventListener('mouseleave', () => {
                searchDropdown.style.display = 'none';
            });
        } 
        // Mobile Click
        else {
            const searchToggle = searchMenu.querySelector('.search-toggle');
            searchToggle.addEventListener('click', function(e) {
                e.preventDefault();
                searchDropdown.classList.toggle('active');
            });
        }
    }

    // ===== CLOSE MENUS WHEN CLICKING OUTSIDE =====
    document.addEventListener('click', function(e) {
        // Mobile menu close
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        }
        
        // Profile dropdown close (mobile)
        if (window.innerWidth <= 768 && 
            userDropdown.classList.contains('active') && 
            !e.target.closest('.user-profile-info') && 
            !e.target.closest('.user-dropdown-menu')) {
            userDropdown.classList.remove('active');
            if (profileArrow) {
                profileArrow.classList.remove('fa-chevron-up');
                profileArrow.classList.add('fa-chevron-down');
            }
        }
    });

    // ===== WINDOW RESIZE HANDLER =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) { // Switching to desktop
            // Reset mobile states
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
            
            // Reset dropdown styles
            if (searchDropdown) {
                searchDropdown.style.display = 'none';
                searchDropdown.classList.remove('active');
            }
            
            userDropdown.classList.remove('active');
            if (profileArrow) {
                profileArrow.classList.remove('fa-chevron-up');
                profileArrow.classList.add('fa-chevron-down');
            }
        }
    });

    // ===== STICKY SECONDARY NAV =====
    const secondaryNav = document.querySelector('.secondary-nav-bar');
    if (secondaryNav) {
        const stickyOffset = secondaryNav.offsetTop;
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > stickyOffset) {
                secondaryNav.classList.add('sticky');
                document.body.classList.add('has-sticky-nav');
            } else {
                secondaryNav.classList.remove('sticky');
                document.body.classList.remove('has-sticky-nav');
            }
        });
    }

    // ===== LOADING STATE =====
    const loadingState = document.createElement('div');
    loadingState.className = 'dashboard-loading';
    loadingState.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading your dashboard...</p>
    `;
    document.body.appendChild(loadingState);
    setTimeout(() => loadingState.remove(), 1500);
});

// ===== DYNAMIC STYLES =====
const style = document.createElement('style');
style.textContent = `
    .secondary-nav-bar.sticky {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    body.has-sticky-nav {
        padding-top: 50px;
    }
    .dashboard-loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    .loading-spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #920042;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin-bottom: 15px;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .user-dropdown-menu {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);