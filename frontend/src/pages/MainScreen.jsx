// Link is used for navigation between pages without refreshing the browser
import { Link } from 'react-router-dom'

// This imports the Cropelle logo image from the assets folder
import cropelleLogo from '../assets/cropelle-logo.png'

// This is the MainScreen component.
// It represents the first screen users see when they open the app.
function MainScreen() {
  return (
    // Main outer container
    // min-h-screen makes the page take the full height of the screen
    // bg-black gives the black background around the app frame
    // flex, items-center, justify-center center the content horizontally and vertically
    // p-2 gives small padding on mobile, sm:p-4 gives more padding on bigger screens
    <div className="min-h-screen bg-black flex items-center justify-center p-2 sm:p-4">

      {/* Device frame */}
      {/* This creates the black tablet/device-like border around the app screen */}
      <div className="w-full max-w-5xl border-2 sm:border-4 border-gray-300 rounded-xl sm:rounded-2xl bg-black p-3 sm:p-6 md:p-10 shadow-2xl">

        {/* App screen */}
        {/* This is the actual white screen inside the black device frame */}
        <div className="bg-white min-h-[560px] sm:min-h-[620px] flex flex-col overflow-hidden">

          {/* Top cream section */}
          {/* This section contains the logo and CROPELLE heading */}
          <section className="bg-[#f4efe5] flex flex-col items-center justify-center py-8 sm:py-10">

            {/* Logo image */}
            {/* src displays the imported logo image */}
            {/* alt is used for accessibility and describes the image */}
            {/* w/h classes control the logo size on mobile, tablet, and desktop */}
            {/* object-contain keeps the image from being stretched */}
            <img
              src={cropelleLogo}
              alt="Cropelle Logo"
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain mb-4"
            />

            {/* App name heading */}
            {/* Text size increases on bigger screens */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#176323] tracking-wide">
              CROPELLE
            </h1>
          </section>

          {/* Bottom white section */}
          {/* This section contains the welcome text and buttons */}
          <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 text-center">

            {/* This keeps the text from becoming too wide on large screens */}
            <div className="max-w-3xl">

              {/* Welcome heading */}
              <h2 className="font-extrabold text-black text-sm sm:text-base leading-tight">
                🌱 Welcome to CROPELLE 🌱
              </h2>

              {/* Text copied from the screenshot */}
              <p className="font-extrabold text-black text-sm sm:text-base leading-tight">
                Your all-in-one web app for managing farming activities with ease.
              </p>

              <p className="font-extrabold text-black text-sm sm:text-base leading-tight">
                Keep track of your crops, monitor livestock, and stay organized with
              </p>

              <p className="font-extrabold text-black text-sm sm:text-base leading-tight">
                everything in one place, accessible anytime, from anywhere.
              </p>

              <p className="font-extrabold text-black text-sm sm:text-base leading-tight">
                Whether you're planning, tracking, or reviewing progress, this platform helps
              </p>

              <p className="font-extrabold text-black text-sm sm:text-base leading-tight">
                you stay in control of your farm operations.
              </p>

              {/* Bottom instruction text */}
              {/* mb-6 gives margin below on mobile, sm:mb-8 gives more spacing on bigger screens */}
              <p className="font-extrabold text-black text-sm sm:text-base leading-tight mb-6 sm:mb-8">
                Log in to continue or create an account to get started.
              </p>

            {/* Buttons container */}
            {/* flex-col stacks buttons vertically on mobile */}
            {/* sm:flex-row places buttons next to each other on larger screens */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 md:gap-12">

            {/* Login button */}
            {/* flex, items-center, and justify-center center the button text horizontally and vertically */}
            <Link
                to="/"
                className="bg-[#176323] text-white font-extrabold text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-20 py-4 sm:py-5 hover:bg-[#104b1a] transition w-full sm:w-auto sm:min-w-[240px] md:min-w-[320px] flex items-center justify-center text-center"
            >
                LOGIN
            </Link>

            {/* Create account button */}
            {/* text-center keeps the two-line text centered */}
            <Link
                to="/"
                className="bg-[#176323] text-white font-extrabold text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 hover:bg-[#104b1a] transition leading-tight w-full sm:w-auto sm:min-w-[240px] md:min-w-[320px] flex items-center justify-center text-center"
            >
                CREATE AN <br /> ACCOUNT
            </Link>
            </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// This allows the MainScreen component to be imported and used in App.jsx
export default MainScreen