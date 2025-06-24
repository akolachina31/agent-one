"""
AgentOne FastAPI Backend
-----------------------
This backend provides:
- A LangChain-powered LLM QA endpoint for Gainsight support
- Canonical URL mapping for key Gainsight KB articles
- Live scraping of the 'Create a Connection' steps for Salesforce Connector

Environment variables required:
- OPENAI_API_KEY: For OpenAI GPT access

To run:
$ export OPENAI_API_KEY=sk-...yourkey...
$ python main.py

Author: [Your Name]
"""

from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn
import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
from dataclasses import dataclass
from pydantic import BaseModel
import os

# LangChain imports for LLM QA
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

# --- Data Models ---
@dataclass
class Reference:
    title: str
    url: str
    source_type: str  # "KB" or "Community"

@dataclass
class Answer:
    overview: str
    steps: List[str]
    references: List[Reference]

class Question(BaseModel):
    text: str

class AgentRequest(BaseModel):
    query: str

# --- Canonical Article URL Mapping ---
ARTICLE_URL_MAP = {
    # Add more mappings as needed for reliability
    "salesforce connector": "https://support.gainsight.com/gainsight_nxt/Connectors/CRM_Integrations/Salesforce_Connector",
    "connect salesforce to gainsight": "https://support.gainsight.com/gainsight_nxt/Connectors/CRM_Integrations/Salesforce_Connector",
    "salesforce to gainsight": "https://support.gainsight.com/gainsight_nxt/Connectors/CRM_Integrations/Salesforce_Connector",
    "gainsight salesforce integration": "https://support.gainsight.com/gainsight_nxt/Connectors/CRM_Integrations/Salesforce_Connector",
}

def get_canonical_url(query: str) -> Optional[str]:
    """Return canonical KB URL if query matches a known mapping."""
    q = query.lower()
    for keyword, url in ARTICLE_URL_MAP.items():
        if keyword in q:
            return url
    return None

# --- LangChain LLM QA Setup ---
CUSTOM_SYSTEM_PROMPT = (
    "You are an intelligent support assistant agent, specialized for Gainsight’s Customer Success platform. "
    "Your primary responsibility is to answer questions accurately by strictly utilizing content from the official Gainsight Support Knowledge Base (KB) located at https://support.gainsight.com/ and the Gainsight Community at https://communities.gainsight.com/. "
    "Always provide clear, structured answers with direct links and explicit references. Never fabricate or assume details not explicitly stated in Gainsight’s official sources."
)

llm = ChatOpenAI(
    openai_api_key=os.getenv("OPENAI_API_KEY"),
    temperature=0.0,
    model="gpt-3.5-turbo"
)
prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template(CUSTOM_SYSTEM_PROMPT),
    HumanMessagePromptTemplate.from_template("{input}")
])
qa_chain = LLMChain(llm=llm, prompt=prompt)

# --- FastAPI App ---
app = FastAPI()

@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"message": "Gainsight Support Assistant API"}

@app.post("/agent")
async def agent_endpoint(request: AgentRequest):
    """
    Main QA endpoint. Returns canonical URL if query matches, else uses LLM.
    """
    canonical_url = get_canonical_url(request.query)
    if canonical_url:
        return {
            "result": f"To set up the Salesforce Connector in Gainsight, refer to the official documentation here: [{canonical_url}]({canonical_url})\n\nThis page provides the latest steps and best practices for configuration."
        }
    result = qa_chain.invoke({"input": request.query})
    return {"result": result["text"]}

# --- Live Scraping Endpoint Example ---
SALESFORCE_CONNECTOR_URL = "https://support.gainsight.com/gainsight_nxt/Connectors/CRM_Integrations/Salesforce_Connector"

@app.get("/salesforce-connector/create-connection-steps")
def get_create_connection_steps():
    """
    Scrapes the 'Create a Connection' section from the Salesforce Connector KB page.
    Returns the steps as a list.
    """
    try:
        resp = requests.get(SALESFORCE_CONNECTOR_URL, timeout=10)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        # Find the 'Create a Connection' section by heading
        section = None
        for h in soup.find_all(['h2', 'h3', 'h4']):
            if 'create a connection' in h.get_text(strip=True).lower():
                section = h
                break
        if not section:
            return JSONResponse(status_code=404, content={"error": "Section not found"})
        # Collect steps (assume they are in the next <ol> or <ul> after the heading)
        steps = []
        next_elem = section.find_next_sibling()
        while next_elem and next_elem.name not in ['ol', 'ul']:
            next_elem = next_elem.find_next_sibling()
        if next_elem and next_elem.name in ['ol', 'ul']:
            for li in next_elem.find_all('li', recursive=False):
                steps.append(li.get_text(strip=True))
        if not steps:
            return JSONResponse(status_code=404, content={"error": "No steps found in section"})
        return {"section": "Create a Connection", "steps": steps}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

if __name__ == "__main__":
    # Run with: python main.py
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)