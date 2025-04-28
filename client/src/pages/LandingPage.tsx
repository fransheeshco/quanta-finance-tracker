import "../styles/landingpage.css";
import Footer from "../components/Footer";

function LandingPage() {
    return (
        <>
            <section className="custom-bg"
            >
                <div className="container mx-auto px-4 pt-10">
                    <div className="quanta-text mt-12 flex items-center">
                        QUANTA
                    </div>
                    <div className="tag-line flex items-center">
                        Your finances, your <br></br>
                        future—organized. 
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}

export default LandingPage;