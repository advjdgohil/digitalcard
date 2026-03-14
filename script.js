// Basic particle effect for background
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.position = 'absolute';
    particle.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
    particle.style.borderRadius = '50%';
    
    // Random position
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    // Animation properties
    const duration = Math.random() * 20 + 20; // 20-40s
    particle.style.animation = `floatParticle ${duration}s linear infinite`;
    
    container.appendChild(particle);
}

// Add CSS keyframes for particles dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatParticle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// vCard Generation
function saveContact() {
    const contactInfo = {
        name: "Jaydipsinh A. Gohil",
        title: "Advocate (B.COM | LLB)",
        phone: "+918530769705",
        email: "adv.jdgohil@gmail.com",
        address: "Mirzapur (Incometax), City Civil & Sessions Court, Metropolitan Magistrate Court."
    };

    // Create vCard content
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactInfo.name}\nN:Gohil;Jaydipsinh;A.;;\nTITLE:${contactInfo.title}\nTEL;TYPE=CELL:${contactInfo.phone}\nEMAIL;TYPE=WORK,INTERNET:${contactInfo.email}\nADR;TYPE=WORK:;;${contactInfo.address};;;;\nEND:VCARD`;

    // Create blob and download link
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Jaydipsinh_A_Gohil_Advocate.vcf';
    
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Copy to Clipboard
function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const icon = btn.querySelector('i');
        const originalClass = icon.className;
        icon.className = 'fa-solid fa-check text-success';
        btn.classList.add('copied');
        
        setTimeout(() => {
            icon.className = originalClass;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// 3D Tilt Effect
function initTiltEffect() {
    const card = document.getElementById('tilt-card');
    const glow = document.getElementById('card-glow');
    
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Slightly rotate based on mouse position
        const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg rotation
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        if (glow) {
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            glow.style.opacity = '1';
        }
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
        if (glow) glow.style.transition = 'opacity 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        
        if (glow) {
            glow.style.opacity = '0';
            glow.style.transition = 'opacity 0.5s ease';
        }
    });
}

// Magnetic Buttons Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTiltEffect();
    initMagneticButtons();
});
