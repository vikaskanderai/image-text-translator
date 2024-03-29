import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSelect } from "./components/languageSelect";
import { Label } from "@/components/ui/label";
import { Type } from "lucide-react";
import {Toaster, toast} from 'sonner'
import {Input} from "@/components/ui/input"

function App() {
  const [image, setImage] = useState(null);
  const [fromLang, setFromLang] = useState();
  const [toLang, setToLang] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

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
    formData.append("fromLang", fromLang);
    formData.append("toLang", toLang);
    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
        if(data.status === 200) toast.success("Image uploaded successfully and text translated successfully")
        else toast.error("Error uploading image and translating text")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error uploading image and translating text")
      });
  };

  useEffect(() => {
    console.log(fromLang, toLang);
  }, [fromLang, toLang]);

  return (
    <ThemeProvider>
    <Toaster richColors position="top-right" duration={2500} />
      <nav className="flex justify-between items-center m-2">
        <h1 className="font-bold">Transmania</h1>
        <ModeToggle />
      </nav>

      <div className="text-center m-10 grid gap-5">
        <h1 className="text-3xl font-semibold ml-4">Transmania</h1>
        <h2>
          This is a simple Image to Text Translator. You can upload an image and
          it will convert the text in the image to text.
        </h2>
        <form className="grid justify-center gap-10">
        
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className=""
          />
        
           {image && (
        <div className="flex justify-center items-center">
          <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="w-52 object-cover" />
        </div>
      )}
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
        {response ? 
        <div>
                <div>
                  <p>The Extracted Text is :  {response.data.original_text}</p>
                  <p>The Translated Text is :  {response.data.translated_text}</p>
                </div>
            </div>
              : null}
            </div>
          </ThemeProvider>
  );
}

export default App;
