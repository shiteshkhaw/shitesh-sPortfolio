import './globals.css';

export const metadata = {
  title: 'Shitesh Khaw | Portfolio',
  description: 'VS Code-themed developer portfolio showcasing projects, skills, and experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
