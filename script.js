document.addEventListener('DOMContentLoaded', function() {
    // Toggle Sidebar
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show target section
            document.getElementById(targetId).classList.add('active-section');
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Project Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe 'active' de todos os botões
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
    
            // Adiciona a classe 'active' ao botão clicado
            this.classList.add('active');
    
            const filterValue = this.getAttribute('data-filter');
    
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Simulate form submission
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Show success message
                    alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Por favor, preencha todos os campos do formulário.');
            }
        });
    }
    
    // Initialize Charts
    initCharts();
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            }
        });
    }
    
    // Initialize skill bars animation
    animateSkillBars();
    
    // Animate on scroll
    window.addEventListener('scroll', function() {
        animateSkillBars();
    });
});

// Charts Initialization
function initCharts() {
    // Project Impact Chart
    const projectImpactCtx = document.getElementById('projectImpactChart');
    
    if (projectImpactCtx) {
        new Chart(projectImpactCtx, {
            type: 'bar',
            data: {
                labels: ['Restauração', 'Gestão de Resíduos', 'Educação Ambiental', 'Licenciamento', 'Monitoramento', 'Consultoria'],
                datasets: [{
                    label: 'Impacto Ambiental (escala 1-100)',
                    data: [85, 70, 65, 55, 75, 60],
                    backgroundColor: [
                        'rgba(22, 163, 74, 0.7)',
                        'rgba(22, 163, 74, 0.6)',
                        'rgba(22, 163, 74, 0.5)',
                        'rgba(22, 163, 74, 0.4)',
                        'rgba(22, 163, 74, 0.6)',
                        'rgba(22, 163, 74, 0.5)'
                    ],
                    borderColor: [
                        'rgba(22, 163, 74, 1)',
                        'rgba(22, 163, 74, 1)',
                        'rgba(22, 163, 74, 1)',
                        'rgba(22, 163, 74, 1)',
                        'rgba(22, 163, 74, 1)',
                        'rgba(22, 163, 74, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Project Distribution Chart
    const projectDistributionCtx = document.getElementById('projectDistributionChart');
    
    if (projectDistributionCtx) {
        new Chart(projectDistributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Conservação', 'Resíduos', 'Educação', 'Consultoria'],
                datasets: [{
                    data: [35, 25, 20, 20],
                    backgroundColor: [
                        'rgba(22, 163, 74, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(139, 92, 246, 0.7)'
                    ],
                    borderColor: [
                        'rgba(22, 163, 74, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(139, 92, 246, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Skills Radar Chart
    const skillsRadarCtx = document.getElementById('skillsRadarChart');
    
    if (skillsRadarCtx) {
        new Chart(skillsRadarCtx, {
            type: 'radar',
            data: {
                labels: [
                    'Licenciamento Ambiental',
                    'Gestão de Resíduos',
                    'Consultoria Ambiental',
                    'Educação Ambiental',
                    'Recuperação de Áreas',
                    'Monitoramento Ambiental'
                ],
                datasets: [{
                    label: 'Nível de Expertise',
                    data: [95, 90, 85, 80, 85, 90],
                    backgroundColor: 'rgba(22, 163, 74, 0.2)',
                    borderColor: 'rgba(22, 163, 74, 1)',
                    pointBackgroundColor: 'rgba(22, 163, 74, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(22, 163, 74, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
}

