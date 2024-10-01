import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { createGlobalStyle } from "styled-components";

const StyledGlobalStyle = createGlobalStyle`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////     Global Styles      //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
    font-family: "Roboto", sans-serif;
    margin: 0; 
    padding: 0; 
}
  :root {
    /* Variables communes */
    --hover-color-primary: #9a7d6b; 
    --hover-color-secondary: #d9b99b; 
    --hover-color-dark: #444444; 

    /* Couleurs des messages */
    --error-color: #B00000; /* Erreurs pour tous les thèmes */
    --validation-color-light: #4CAF50; /* Vert pour validations en mode clair */
l    
    /* Daltonien */
    --validation-color-daltonian: #0098FD; /* Couleur alternative en mode daltonien pour validations */
    --error-color-daltonian: #C600E9; /* Couleur alternative pour erreurs en mode daltonien */

    /*  Thème Clair  */ 
    --primary-bg-color-light: #E6E6E6; 
    --secondary-bg-color-light: #C0C0C0; 
    --block-bg-color-light: #D9B99B; 
    --border-color-light: #9a7d6b; 
    --hover-bg-color-light: #9a7d6b; 
    --text-primary-light: #333; 
    --text-secondary-light: #555;
    --text-light: #ffffff;      
    --shadow-color-light: rgba(0, 0, 0, 0.1); 

    /*  Thème Sombre  */ 
    --primary-bg-color-dark: #1e1e1e; 
    --secondary-bg-color-dark: #2b2b2b;
    --tertiary-bg-color-dark: #555555 
    --block-bg-color-dark: #ffffff; 
    --border-color-dark: #555555; 
    --hover-bg-color-dark: #9a7d6b;
    --text-light: #ffffff;
    --light-bg:#ffffff; 
    --dark-bg:#000000;
    --text-primary-dark: #e6e6e6; 
    --text-secondary-dark: #cccccc; 
    --shadow-color-dark: rgba(0, 0, 0, 0.3);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////      Thème Clair, Daltonian       ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Eye Theme */
[data-theme="eye"] {
  /* Daltonian Theme Styles (Eye Mode) */
  --background-color: var(--secondary-bg-color-light);
  --text-color: var(--text-primary-light);
  --primary-color: var(--block-bg-color-light);
  --secondary-color: var(--secondary-bg-color-light);
  --hover-color: var(--button-color-daltonian);
  --validation-color: var(--validation-color-daltonian);
  --error-color: var(--error-color-daltonian);
  
  .added {
    color: var(--validation-color-daltonian);
  }

  .decline {
    color: var(--error-color-daltonian);
  }
}


/* Light and Eye Theme Styles */
[data-theme="light"] {
    --background-color: var(--secondary-bg-color-light);
    --text-color: var(--text-primary-light);
    --primary-color: var(--block-bg-color-light);
    --secondary-color: var(--secondary-bg-color-light);
    --hover-color: var(--hover-bg-color-light);
    --validation-color: var(--validation-color-light);

    .added {
        color: var(--validation-color-light);
    }

    .decline {
        color: var(--error-color);
    }

    /* Appliquer des variables spécifiques pour le mode "eye" */
    [data-theme="eye"] & {
        --validation-color: var(--validation-color-daltonian);
        --error-color: var(--error-color-daltonian);
        --hover-color: var(--button-color-daltonian);

        .added {
            color: var(--validation-color-daltonian);
        }

        .decline {
            color: var(--error-color-daltonian);
        }
    }
}



 /* Navbar and Footer */
    header, footer {
        background-color: var(--primary-bg-color-light);
        color: var(--text-color);
       
    }

/* Vertical Line */
.verticalLine {
    position: relative;
    display: inline-block;
    width: 2px; /* Adjust width of the line */
    height: 150px;
    margin: 0 20px;
    background-color: transparent;
}

.verticalLine::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--hover-color) 100%, rgba(255, 255, 255, 0.3) 100%);
}

/* Card Styles */
.card1 {
    background-color: var(--primary-bg-color-light);
    border: 1px solid var(--primary-bg-color-dark);
    
    color: var(--text-color);
    box-shadow: 0 2px 4px var(--shadow-color-light);
    border-radius: 8px;
    padding: 1rem;
}

.card1:hover {
    box-shadow: 0 4px 8px var(--shadow-color-light);
}

.card2 {
    background-color: var(--secondary-color);
    border: 2px solid var(--primary-bg-color-light);
    border-radius: 8px;
}

.card3 {
    background-color: var(--block-bg-color-light);
    border: 2px solid var(--hover-bg-color-light);
    border-radius: 8px;
}

/* Form Card */
.form-card {
    background-color: var(--primary-color);
    color: var(--text-color);
    padding: 2rem;
    border: 1px solid var(--border-color-light);
    border-radius: 8px;
}

/* Gradients */
.gradient1 {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 80%);
   
}

.gradient2 {
    background: linear-gradient(135deg, var(--secondary-color) 0%, rgba(154, 125, 107, 0.3) 100%);
}

.gradient3 {
    background: linear-gradient(135deg, var(--hover-color) 0%, rgba(255, 255, 255, 0.3) 100%);
}
.gradient4 {
    background: linear-gradient(135deg, var(--hover-color) 0%, rgba(255, 255, 255, 0.3) 100%);
}
/* Titles */
.title1 {
    color: var(--text-color);
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.title2 {
    color: var(--text-color);
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
}

.title3 {
    color: var(--text-color);
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
/* Buttons */
button {
    background-color: var(--primary-color);
    color: var(--text-color-primary);
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    box-shadow: 0 2px 4px var(--shadow-color-light);
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s ease;
    font-size: 1rem; /* Base font size for buttons */
}

button:hover {
    background-color: var(--hover-bg-color-light);
    box-shadow: 0 4px 8px var(--shadow-color-light);
}

button:disabled {
    background-color: #ccc; /* Color for disabled buttons */
    cursor: not-allowed; /* Cursor for disabled buttons */
}

/* Button Styles */
.button1,
.button2,
.button3 {
    border: none;
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button1 {
    background-color: var(--primary-color);
    color: var(--text-color);
}

.button1:hover {
    background-color: var(--hover-bg-color-light);
}

.button2 {
    background-color: var(--secondary-color);
    color: var(--text-color);
}

.button2:hover {
    background-color: var(--hover-bg-color-light);
    color: var(--text-color);
}

.button3 {
    background-color: var(--block-bg-color-light);
    color: var(--text-color);
}

.button3:hover {
    background-color: var(--hover-bg-color-light);
}

/* Input Fields */
.input-field,
.textarea,
.select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color-light);
    border-radius: 5px;
    margin-bottom: 1rem;
    color: var(--text-color);
    background-color: var(--input-bg-color-light);
}

.input-field:focus,
.textarea:focus,
.select:focus {
    border-color: var(--primary-color);
    outline: none;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
    color: var(--text-color-dark);
    margin: 0;
    font-weight: bold;
}

h1 {
    font-size: 3.5rem;
}

h2 {
    font-size: 2rem;
}

h3 {
    font-size: 1.75rem;
}

h4 {
    font-size: 1.5rem;
}

h5 {
    font-size: 1.25rem;
}

h6 {
    font-size: 1rem;
}

/* Paragraphs */
p {
    color: var(--text-color);
    line-height: 1.5;
    margin: 0;
}

/* Lists */
ul, ol {
    color: var(--text-color);
    margin-left: 1.5rem;
}

/* Images */
img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

/* Input and Textarea Styles */
input, textarea {
    background-color: var(--background-color);
    border: 1px solid var(--border-color-light);
    border-radius: 4px;
    padding: 0.5rem;
    width: 100%;
    margin-bottom: 1rem;
    transition: background-color 0.3s, border-color 0.3s;
    font-size: 1rem; /* Base font size for inputs */
}

input:focus,
textarea:focus {
    border-color: var(--hover-bg-color-light);
    outline: none;
}

/* Span Styles */
span {
    color: var(--hover-color);
    transition: color 0.3s;
}

span.dark-mode:hover {
    color: var(--hover-color);
}

span:hover {
    color: var(--hover-bg-color-light);
}

/* Links */
a {
    color: var(--text-color); /* Default link color */
    text-decoration: none; /* Remove underline */
    transition: color 0.3s; /* Smooth transition for color */
}

a:hover {
    color: var(--hover-color); /* Color on hover */
    text-decoration: underline; /* Underline on hover */
}

/* Card Styles */
.card {
    background-color: var(--primary-color);
    box-shadow: 0 2px 4px var(--shadow-color-light);
    border-radius: 8px;
    transition: transform 0.3s;
    padding: 1rem;
}

.card.dark-mode {
    background-color: var(--primary-bg-color-light);
    box-shadow: 0 2px 4px var(--shadow-color-dark);
}

.card:hover {
    transform: translateY(-2px); /* Slight elevation of the card */
}

/* Modal Styles */
.modal {
    background-color: var(--block-bg-color-light);
    box-shadow: 0 2px 10px var(--shadow-color-light);
    border-radius: 8px;
    transition: background-color 0.3s;
    padding: 1rem;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////      Thème Sombre       //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

[data-theme="dark"] {
    /* General Color Variables */
    --background-color: var(--primary-bg-color-dark);
    --text-color: var(--text-primary-dark);
    --primary-color: var(--block-bg-color-dark);
    --secondary-color: var(--secondary-bg-color-dark);
    --hover-color: var(--hover-bg-color-dark);
    --validation-color: var(--validation-color-dark); /* Validation color */
    .added {
    color: var(--validation-color-light);
    }
    .decline {
    color: var(--error-color);
    }
    
    body {
    background-color: var(--border-color-dark);
    
}

    /* Navbar and Footer */
    header, footer {
        background-color: var(--primary-bg-color-light);
        color: var(--secondary-color);
         a {
        background-color: var(--primary-bg-color-light);

        color: var(--secondary-color);
        text-decoration: none;
        transition: color 0.3s;
        }
         a:hover {
        color: var(--hover-color);
        text-decoration: underline;
        }
    }
        a{
        background-color: var(--primary-bg-color-dark);
        
        }
         a:hover {
        text-decoration: underline;
        }
    /* Vertical Line Style */
    .verticalLine {
        position: relative;
        display: inline-block;
        width: 2px; /* Line width */
        height: 150px;
        margin: 0 20px;
        background-color: transparent;
    }

    .verticalLine::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--hover-color) 100%, rgba(255, 255, 255, 0.3) 100%);
    }

    /* Card Styles */
    .card1 {
        background-color: var(--secondary-color);
        color: var(--block-bg-color-dark );
        border-color: var(--secondary-color-dark);
        border-radius: 8px;
        padding: 1rem;
        transition: transform 0.3s;
        select {
        color: var(--secondary-color)
        }

    
    }
    

    .card1:hover {
        box-shadow: 0 4px 8px var(--shadow-color-light);
    }

    .card2 {
        background-color: var(--secondary-color);
        border: 2px solid var(--primary-bg-color-light);
        padding: 1rem;
        border-radius: 8px;
    }

    .card3 {
        background-color: var(--block-bg-color-dark);
        border: 2px solid var(--primary-bg-color-light);
        color: var(--primary-bg-color-dark);
        padding: 1rem;
        border-radius: 8px;
    }

    /* Form Card */
    .form-card {
        background-color: var(--primary-color);
        color: var(--text-color);
        padding: 2rem;
        border: 1px solid var(--border-color-light);
        border-radius: 8px;
    }

    /* Gradient Backgrounds */
    .gradient1 {
        background: linear-gradient(135deg, var(--secondary-bg-color-dark) 33%, rgba(255, 255, 255, 0.3) 100%);
        color: var(--text-color-dark);
        .button3 {
            background-color: var(--secondary-bg-color-dark);
            color: var(--text-color);
        }

        .button3:hover {
            background-color: var(--hover-bg-color-light);

            }

    .gradient2 {
        background: linear-gradient(135deg, var(--secondary-color), var(--hover-color));
    }

    .gradient3 {
        background: linear-gradient(360deg, var(--primary-color)20%, var(--primary-color) 100%);
         color: var(--text-color-light)
    }
    .gradient4 {  
        background: linear-gradient(135deg, var(--secondary-color)40%, var(--primary-color) 100%);
         color: var(--text-color-light)
         p {
         color: var(--text-color-light}
        } 
    }    

    /* Titles */
    .title1, .title2, .title3 {
        color: var(--text-color);
        font-weight: bold;
    }

    .title1 { font-size: 2.5rem; margin-bottom: 1rem; }
    .title2 { font-size: 2rem; margin-bottom: 0.75rem; }
    .title3 { font-size: 1.75rem; margin-bottom: 0.5rem; }

    /* Buttons */
button {
    background-color: var(--text-color);
    color: var(--text-color);

    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    box-shadow: 0 2px 4px var(--shadow-color-light);
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s ease;
    font-size: 1rem; /* Base font size for buttons */
}

button:hover {
    background-color: var(--hover-bg-color-light);
    box-shadow: 0 4px 8px var(--shadow-color-light);
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Button Styles */
.button1,
.button2,
.button3 {
    border: none;
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button1 {
    background-color: var(--primary-color);
    color: var(--text-color);
}

.button1:hover {
    background-color: var(--hover-bg-color-light);
}

.button2 {
    background-color: var(--primary-color);
    color: var(--secondary-color);
}

.button2:hover {
    background-color: var(--hover-bg-color-light);
    color: var(--text-color);
}

.button3 {
    background-color: var(--text-color);
    color: var(--text-color);
    border: var(--primary-color)
}

.button3:hover {
    background-color: var(--hover-bg-color-dark);
}

    
/* Span Styles */
span {
    color: var(--hover-color);
    transition: color 0.3s;
}

span.dark-mode:hover {
    color: var(--hover-color);
}

span:hover {
    color: var(--hover-bg-color-light);
}

    /* Input Fields */
    .input-field, .textarea, .select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color-light);
        border-radius: 5px;
        margin-bottom: 1rem;
        color: var(--text-color);
        background-color: var(--input-bg-color-light);
    }

    .input-field:focus, .textarea:focus, .select:focus {
        border-color: var(--primary-color);
        outline: none;
    }

    /* Headings */
h1, h2, h3, h4, h5, h6 {
    color: var(--text-color-light);
    margin: 0;
    font-weight: bold;
}

h1 {
    font-size: 3.5rem;
}

h2 {
    font-size: 2rem;
}

h3 {
    font-size: 1.75rem;
}

h4 {
    font-size: 1.5rem;
}

h5 {
    font-size: 1.25rem;
}

h6 {
    font-size: 1rem;
}
    /* Paragraphs */
p {
    color: var(--secondary-color);
    line-height: 1.5;
}
    /* Links */
    a {
        color: var(--primary-color);
        text-decoration: none;
        transition: color 0.3s;
    }

    a:hover {
        color: var(--hover-color);
        text-decoration: underline;
    }

    /* Cards */
    .card {
        background-color: var(--primary-color);
        box-shadow: 0 2px 4px var(--shadow-color-light);
        border-radius: 8px;
        transition: transform 0.3s;
        padding: 1rem;
    }

    .card:hover {
        transform: translateY(-2px);
    }

    /* Modals */
    .modal {
        background-color: var(--block-bg-color-light);
        box-shadow: 0 2px 10px var(--shadow-color-light);
        border-radius: 8px;
        padding: 1rem;
    }
}
 

  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////        RESPONSIVE       /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  @media (max-width: 768px) {
    h1 {
      font-size: 2rem; /* Reduce size for mobile */
    }

    h2 {
      font-size: 1.75rem; /* Reduce size for mobile */
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////         END            //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
`;

export default StyledGlobalStyle;

export const GlobalStyle = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <StyledGlobalStyle />;
};
