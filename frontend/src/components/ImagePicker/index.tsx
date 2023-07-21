import { ChangeEvent, useRef, useState } from "react";
import { HiMiniMinusCircle, HiMiniPlusCircle } from "react-icons/hi2";
import { BiImageAdd } from "react-icons/bi";
import { Controller, useFormContext } from "react-hook-form";

type ImagePickerProps = {
  name: string;
};

export const ImagePicker = ({ name }: ImagePickerProps) => {
  const [image, setImage] = useState<File>({} as File);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const inputFile = useRef<HTMLInputElement>(null);

  const { setValue, watch } = useFormContext();
  const valueImage = watch(name);
  console.log(valueImage);
  function handleChooseImage() {
    if (inputFile.current) {
      inputFile.current.click();
      setIsOptionsVisible(false);
    }
  }

  return (
    <Controller
      name={name}
      render={() => {
        return (
          <div
            onMouseOverCapture={() => setIsOptionsVisible(true)}
            onMouseLeave={() => setIsOptionsVisible(false)}
            className="w-full mb-5 relative bg-gray-200 rounded-md border-gray-400 border-dashed border-2  max-h-40 h-full"
          >
            {image?.name || valueImage ? (
              <img
                src={
                  valueImage?.name === undefined
                    ? valueImage
                    : URL.createObjectURL(image)
                }
                alt="image product"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-gray-400 flex h-full justify-center items-center">
                <BiImageAdd size={90} />
              </div>
            )}

            {isOptionsVisible && (
              <>
                <div className="absolute top-0 left-0  bg-slate-200 w-full h-full rounded-md" />
                <div className="text-black absolute top-0 left-0 w-full h-full items-center flex justify-center">
                  <div>
                    <div
                      onClick={handleChooseImage}
                      className="flex hover:underline text-gray-600 cursor-pointer items-center"
                    >
                      <div className="mr-[6px]">
                        <HiMiniPlusCircle size={17} />
                      </div>
                      <p>Select image</p>
                    </div>
                    {image?.name && (
                      <div
                        onClick={() => {
                          setImage({} as File);
                          setValue(name, "");
                        }}
                        className="flex mt-1 hover:underline text-gray-600 cursor-pointer items-center"
                      >
                        <div className="mr-[6px]  ">
                          <HiMiniMinusCircle size={17} />
                        </div>
                        <p>Exclude image</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            <input
              className="hidden"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              ref={inputFile}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const { files } = e.target;
                if (!files || files.length === 0) {
                  return;
                }

                const newFile = files[0];

                if (newFile) {
                  setImage(newFile);
                  setValue(name, newFile);
                }
              }}
            />
          </div>
        );
      }}
    />
  );
};
