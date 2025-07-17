"use client"
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [step, setStep] = useState(1);

  return (
    <div className={styles.splashContainer}>
      <div className={styles.centerContent}>
        {/* Step 1 */}
        {step === 1 && (
          <>
            {/* Illustration */}
            <div className={styles.illustration}>
              {/* Replace with your SVG or image */}
              <svg width="157" height="171" viewBox="0 0 157 171" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_1675)">
<path d="M75 37.8125L110.375 73.1875C117.371 80.1788 122.136 89.0879 124.068 98.7878C126 108.488 125.012 118.543 121.228 127.681C117.445 136.819 111.036 144.63 102.813 150.126C94.59 155.621 84.9217 158.554 75.0313 158.554C65.1408 158.554 55.4725 155.621 47.2494 150.126C39.0262 144.63 32.6176 136.819 28.8342 127.681C25.0507 118.543 24.0625 108.488 25.9944 98.7878C27.9263 89.0879 32.6916 80.1788 39.6875 73.1875L75 37.8125Z" fill="white"/>
</g>
<path d="M122 7.84584L138.508 24.3542C141.773 27.6168 143.997 31.7744 144.898 36.301C145.8 40.8276 145.339 45.52 143.573 49.7845C141.808 54.049 138.817 57.6941 134.979 60.2586C131.142 62.8232 126.63 64.1921 122.014 64.1921C117.399 64.1921 112.887 62.8232 109.05 60.2586C105.212 57.6941 102.221 54.049 100.456 49.7845C98.6902 45.52 98.2291 40.8276 99.1306 36.301C100.032 31.7744 102.256 27.6168 105.521 24.3542L122 7.84584Z" fill="white"/>
<defs>
<filter id="filter0_d_1_1675" x="21.0312" y="37.8125" width="108" height="128.742" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_1675"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_1675" result="shape"/>
</filter>
</defs>
</svg>

            </div>

            <br/>
                        <h1 className={styles.bigTitle}>Water Intake Tracker</h1>
            <p className={styles.subtitle}>
              Achieve your hydration goals with a simple tap!
            </p>
            <div className={styles.progressDots}>
              <span className={styles.activeDot} />
              <span />
              <span />
            </div>
            <button className={styles.bigNextButton} onClick={() => setStep(2)}>
              NEXT
            </button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div className={styles.illustration}>
              {/* Replace with your SVG or image */}
              <img src="./Frame.png" alt="Set reminders" style={{ width: 220, marginBottom: 24 }} />
            </div>
            <h1 className={styles.bigTitle}>Set smart reminders</h1>
            <p className={styles.subtitle}>
              Never forget to drink water again. <br /> We’ll remind you!
            </p>
            <div className={styles.progressDots}>
              <span />
              <span className={styles.activeDot} />
              <span />
            </div>
            <button className={styles.bigNextButton} onClick={() => setStep(3)}>
              NEXT
            </button>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <div className={styles.illustration}>
              {/* Replace with your SVG or image */}
              <img src="./Frame2.png" alt="Set reminders" style={{ width: 220, marginBottom: 24 }} />
            </div>
            <h1 className={styles.bigTitle}>Start your journey!</h1>
            <p className={styles.subtitle}>
              Let’s get started and stay hydrated together.
            </p>
            <div className={styles.progressDots}>
              <span />
              <span />
              <span className={styles.activeDot} />
            </div>
            <Link href={"/log"} style={{width:"100%", justifyContent:"center", alignItems:"center",display:"flex"}}>
            <button className={styles.bigNextButton}>
              GET STARTED
            </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}