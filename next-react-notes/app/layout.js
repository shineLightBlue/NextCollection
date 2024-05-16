import './style.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Header></Header>
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