import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSelect } from "./components/languageSelect";
import { Label } from "@/components/ui/label";

function App() {
  const [image, setImage] = useState(null);
  const [fromLang, setFromLang] = useState();
  const [toLang, setToLang] = useState();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
      // body: {
      //   file: formData,
      //   fromLang: fromLang,
      //   toLang: toLang,
      // },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(fromLang, toLang);
  }, [fromLang, toLang]);

  return (
    <ThemeProvider>
      <nav className="flex justify-between items-center m-2">
        <h1>Image To Text Translator</h1>
        <ModeToggle />
      </nav>

      <div className="text-center m-10 grid gap-5">
        <h1 className="text-xl">Image to Text Translator</h1>
        <h2>
          This is a simple Image to Text Translator. You can upload an image and
          it will convert the text in the image to text.
        </h2>
        <form className="grid justify-center gap-10">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-transparent text-sm font-medium rounded-md  px-2 cursor-pointer"
          />
          <h3 className="select the languages"></h3>
          <div className="md:flex gap-10 grid md:grid-cols-1 md:justify-center justify-center items-center md:items-center">
            <div className="flex gap-2 items-center">
              <Label>From Language:</Label>

              <LanguageSelect
                selectedLanguage={fromLang}
                setSelectedLanguage={setFromLang}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label>To Language:</Label>

              <LanguageSelect
                selectedLanguage={toLang}
                setSelectedLanguage={setToLang}
              />
            </div>
          </div>
          <Button className="w-40 " onClick={handleSubmit}>
            Upload Image
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default App;
