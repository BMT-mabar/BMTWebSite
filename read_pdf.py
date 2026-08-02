import sys
import os

# Set output file
output_file = "extracted_pdf_catalog.txt"

def try_extract():
    # Try importing common PDF extraction modules
    reader = None
    try:
        import pypdf
        print("Using pypdf")
        reader = "pypdf"
    except ImportError:
        try:
            import PyPDF2
            print("Using PyPDF2")
            reader = "PyPDF2"
        except ImportError:
            try:
                import pdfplumber
                print("Using pdfplumber")
                reader = "pdfplumber"
            except ImportError:
                print("No PDF extraction libraries found. Trying to install pypdf via pip...")
                return False

    pdf_files = [
        "public/BMT-Products-Catalogue.pdf",
        "public/BMT-Products-Catalogue2.pdf"
    ]

    with open(output_file, "w", encoding="utf-8") as out:
        out.write("=== EXTRACTED BMT PDF CATALOGUE CONTENT ===\n\n")
        
        for pdf_path in pdf_files:
            if not os.path.exists(pdf_path):
                out.write(f"\n--- File not found: {pdf_path} ---\n")
                continue
                
            out.write(f"\n\n--- FILE: {pdf_path} ---\n")
            try:
                if reader == "pypdf":
                    import pypdf
                    pdf = pypdf.PdfReader(pdf_path)
                    for i, page in enumerate(pdf.pages):
                        out.write(f"\n--- PAGE {i+1} ---\n")
                        text = page.extract_text()
                        if text:
                            out.write(text)
                elif reader == "PyPDF2":
                    import PyPDF2
                    pdf = PyPDF2.PdfReader(pdf_path)
                    for i, page in enumerate(pdf.pages):
                        out.write(f"\n--- PAGE {i+1} ---\n")
                        text = page.extract_text()
                        if text:
                            out.write(text)
                elif reader == "pdfplumber":
                    import pdfplumber
                    with pdfplumber.open(pdf_path) as pdf:
                        for i, page in enumerate(pdf.pages):
                            out.write(f"\n--- PAGE {i+1} ---\n")
                            text = page.extract_text()
                            if text:
                                out.write(text)
            except Exception as e:
                out.write(f"Error reading {pdf_path}: {str(e)}\n")
    return True

success = try_extract()
if not success:
    # Try installing pypdf and then running again
    os.system("pip install pypdf")
    try_extract()
