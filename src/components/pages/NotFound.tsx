import {AlertCircle} from "lucide-react";

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center min-h-[75dvh]">
      <span className="text-8xl font-bold text-stone-500 mb-3">404</span>
      <div className="flex justify-center items-center h-64">
        <div className="bg-red-50 border border-red-200 text-stone-500 px-4 py-3 rounded-lg max-w-md">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5"/>
            <h3 className="font-medium">OOPS! PAGE NOT FOUND</h3>
          </div>
          <p className="mt-2 text-sm">
            Faça login ou contate seu administrador de sistema
          </p>
        </div>
      </div>
    </div>
  );
}