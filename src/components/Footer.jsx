import { NavLink } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import CoordinateTicker from './CoordinateTicker'

export default function Footer() {
  return (
    <footer className="bg-graphite-light border-t border-panel-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span className="font-display font-extrabold text-3xl text-steel-light">JAZEERAT</span>
          <p className="font-mono text-[10px] tracking-[0.3em] text-steel mt-1 mb-5">
            AL HADEED · STEEL FABRICATION
          </p>
          <p className="max-w-md text-steel text-sm leading-relaxed">
            An integrated machine workshop delivering precision steel fabrication for
            industrial construction and mechanical engineering across the MENA region.
          </p>
        </div>

        <div>
          <h4 className="font-display uppercase tracking-wide text-steel-light mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm">
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Services', '/services'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <li key={to}>
                <NavLink to={to} className="text-steel hover:text-weld transition-colors">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display uppercase tracking-wide text-steel-light mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-steel">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-weld shrink-0 mt-0.5" />
              <span>Industrial Area, Dubai, UAE</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-weld shrink-0" />
              <span>+971 4 XXX XXXX</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-weld shrink-0" />
              <span>info@jahsteel.ae</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-panel-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-steel text-xs">
            © {new Date().getFullYear()} Jazeerat Al Hadeed. All rights reserved.
          </p>
          <CoordinateTicker />
        </div>
      </div>
    </footer>
  )
}
