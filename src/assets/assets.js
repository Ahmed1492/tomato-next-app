// Logo SVG as data URL (you can replace this with actual logo files)
const logo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='10' y='40' font-family='Arial, sans-serif' font-size='24' font-weight='bold' fill='%235044e5'%3EBlogNest%3C/text%3E%3C/svg%3E";

const arrow = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'/%3E%3C/svg%3E";

export const assets = {
    logo,
    arrow,
};

export const footer_data = [
    {
        title: "Company",
        links: ["About", "Contact", "Privacy Policy", "Terms of Service"]
    },
    {
        title: "Categories",
        links: ["Technology", "Startup", "Lifestyle", "Finance"]
    },
    {
        title: "Resources",
        links: ["Blog", "Newsletter", "Help Center", "Support"]
    }
];