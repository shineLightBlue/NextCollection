import './style.css'
import Sidebar from '@/components/Sidebar'
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <section className="col note-viewer">
              <Sidebar></Sidebar>
              {children}
            </section>
          </div>
        </div>
      </body>
    </html>
  )
}