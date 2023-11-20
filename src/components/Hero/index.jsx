import Fade from "react-reveal/Fade";
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import { useEffect, useState } from "react";

const Hero = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    // const db = getDatabase();
    // const heroRef = ref(db, "hero/");
    // onValue(heroRef, (snapshot) => {
    //   const data = snapshot.val();
    //   setTitle(data.title);
    //   setSubTitle(data.subTitle);
    // });

    const dbRef = ref(getDatabase());
    get(child(dbRef, `hero`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTitle(data.title);
          setSubTitle(data.subTitle);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Fade bottom delay={1000}>
      <section className="hero section center-content illustration-section-01">
        <div className="container-sm">
          <div className="hero-inner section-inner">
            <div className="hero-content">
              <h1
                className="mt-0 mb-16 reveal-from-bottom"
                data-reveal-delay={200}
              >
                {title}
              </h1>
              <div className="container-xs">
                <p
                  className="mt-0 mb-32 reveal-from-bottom"
                  data-reveal-delay={400}
                >
                  {subTitle}
                </p>
              </div>
            </div>
            <div
              className="
									hero-figure
									reveal-from-bottom
									illustration-element-01
								"
              data-reveal-value="20px"
              data-reveal-delay={800}
            >
              <img
                className="has-shadow"
                src="images/hero-image.png"
                alt="Hero image"
                width={896}
                height={504}
              />
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default Hero;
