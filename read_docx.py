import zipfile
import xml.etree.ElementTree as ET
import os

def read_docx(file_path):
    if not os.path.exists(file_path):
        return f"File {file_path} not found."
    try:
        with zipfile.ZipFile(file_path) as docx:
            xml_content = docx.read('word/document.xml')
            root = ET.fromstring(xml_content)
            
            # Word XML namespaces
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            paragraphs = []
            for para in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                texts = [node.text for node in para.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
                if texts:
                    paragraphs.append("".join(texts))
            
            return "\n".join(paragraphs)
    except Exception as e:
        return f"Error reading {file_path}: {str(e)}"

# Read the introductory word documents
docs = [
    "BMT Intruducton.docx",
    "BMT- short Intreduction.docx",
    "Intro BMT Diagnostics.docx",
    "Intruduction mail.docx"
]

print("=== READING WORD DOCUMENTS ===")
for doc in docs:
    print(f"\n--- {doc} ---")
    content = read_docx(doc)
    print(content[:3000]) # print first 3000 characters
