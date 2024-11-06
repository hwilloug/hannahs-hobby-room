import type { APIRoute } from 'astro';
import { marked } from 'marked';

export const POST: APIRoute = async ({ request, locals }) => {
  // Check authentication
  if (!locals.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { title, description, category } = await request.json();

    // Generate content based on category
    let content = `---
title: '${title}'
description: '${description}'
pubDate: '${new Date().toLocaleDateString('en-US', { 
  month: 'short', 
  day: 'numeric',
  year: 'numeric'
})}'
heroImage: '/blog-placeholder-1.jpg'
category: '${category}'
---

# ${title}

${description}

`;

    // Add category-specific sections
    switch (category) {
      case 'Gardening':
        content += `
## What You'll Need

- Quality soil and compost
- Appropriate plants for your zone
- Basic gardening tools
- Watering equipment

## Planning Your Garden

Before starting, consider these important factors:
- Available sunlight
- Soil type and quality
- Local climate and growing zone
- Space requirements

## Step-by-Step Guide

### 1. Preparation
Start by preparing your garden space...

### 2. Planting
Follow these planting guidelines...

### 3. Maintenance
Regular maintenance tips include...

## Seasonal Care Tips

- Spring: 
- Summer: 
- Fall: 
- Winter: 

## Common Problems and Solutions

| Problem | Solution |
|---------|----------|
| Issue 1 | Fix 1    |
| Issue 2 | Fix 2    |

## Conclusion

Summary of key points and next steps...`;
        break;

      case 'Crafts':
        content += `
## Materials Needed

- Material 1
- Material 2
- Material 3

## Tools Required

- Tool 1
- Tool 2
- Tool 3

## Project Steps

### 1. Preparation
Begin by gathering your materials...

### 2. Basic Construction
Start with the foundation...

### 3. Details
Add finishing touches...

## Tips for Success

1. Important tip 1
2. Important tip 2
3. Important tip 3

## Variations

Try these different approaches:

- Variation 1
- Variation 2
- Variation 3

## Display and Care

How to maintain your finished project...`;
        break;

      case 'Coding':
        content += `
## Prerequisites

- Basic understanding of programming concepts
- Development environment setup
- Required software installed

## Project Setup

\`\`\`bash
# Installation commands
npm create vite@latest my-project
cd my-project
npm install
\`\`\`

## Core Concepts

### Key Concept 1
Explanation of the first key concept...

### Key Concept 2
Explanation of the second key concept...

## Implementation

\`\`\`typescript
// Example code
function example() {
  console.log("Hello, World!");
}
\`\`\`

## Testing

How to test your implementation...

## Deployment

Steps for deploying your project...

## Further Resources

- Resource 1
- Resource 2
- Resource 3`;
        break;

      case 'Books':
        content += `
## Book Overview

- Title: [Book Title]
- Author: [Author Name]
- Genre: [Genre]
- Publication Year: [Year]

## Summary

Brief overview of the book...

## Key Themes

1. Theme 1
2. Theme 2
3. Theme 3

## Character Analysis

### Main Character
Character description...

### Supporting Characters
- Character 1
- Character 2

## Notable Quotes

> "Important quote from the book"

## Critical Analysis

Discussion of literary elements...

## Recommendations

Who would enjoy this book...`;
        break;

      case 'Antiquing':
        content += `
## Item History

Brief history of this type of antique...

## Identification Guide

### Key Features
- Feature 1
- Feature 2
- Feature 3

### Authentication Tips
How to verify authenticity...

## Condition Assessment

| Condition | Description | Value Impact |
|-----------|-------------|--------------|
| Excellent | Like new    | Highest     |
| Good      | Minor wear  | Moderate    |
| Fair      | Visible use | Lower       |

## Restoration Tips

### Cleaning
Safe cleaning methods...

### Repairs
Common repair techniques...

## Value Estimation

Factors affecting value:
1. Factor 1
2. Factor 2
3. Factor 3

## Care and Preservation

How to maintain the item...`;
        break;
    }

    // Convert markdown to HTML for preview
    const html = marked(content);

    return new Response(JSON.stringify({ content, html }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error generating content:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};