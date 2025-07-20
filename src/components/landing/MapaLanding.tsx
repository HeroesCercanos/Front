const MapaLanding = () => {
  return (
    <section
      id="cuartel"
      className="w-full px-4 md:px-16 py-12 bg-gradient-to-r from-red-700 to-red-500 text-white"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Cuartel</h2>
          <p className="text-base md:text-lg leading-relaxed">
            Nos encontramos en <strong>Colón 643</strong><br />
            Podés comunicarte con nosotros al:<br />
            <strong>(03775) 422207</strong><br />
            Desde 1979 al servicio de la comunidad.
          </p>

          <p className="mt-6 text-lg md:text-xl font-bold uppercase text-white">
            ¡Ante una emergencia llamá al 100!
          </p>
        </div>

        
        <div className="rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.537209114389!2d-57.63372052504143!3d-30.25027124085075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95acd63c9a46e62f%3A0x3437e09775b25f87!2sCol%C3%B3n%20643%2C%20W3232%20Monte%20Caseros%2C%20Corrientes!5e0!3m2!1ses!2sar!4v1751847917696!5m2!1ses!2sar"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapaLanding;




