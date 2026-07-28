'use client';

// src/components/seo/StructuredDataManager.tsx
// Centralized manager for AEO (Answer Engine Optimization) JSON-LD schemas
import { useEffect, useState } from 'react';

type SchemaType = 'FAQPage' | 'HowTo' | 'Service' | 'BreadcrumbList' | 'Review';

interface StructuredDataManagerProps {
  type: SchemaType;
  data: any;
}

export default function StructuredDataManager({ type, data }: StructuredDataManagerProps) {
  const [schema, setSchema] = useState<string>('');

  useEffect(() => {
    let schemaObj: any = { '@context': 'https://schema.org' };

    switch (type) {
      case 'FAQPage':
        schemaObj = {
          ...schemaObj,
          '@type': 'FAQPage',
          mainEntity: data.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        };
        break;

      case 'BreadcrumbList':
        schemaObj = {
          ...schemaObj,
          '@type': 'BreadcrumbList',
          itemListElement: data.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };
        break;

      case 'Service':
        schemaObj = {
          ...schemaObj,
          '@type': 'Service',
          name: data.title,
          description: data.description,
          provider: {
            '@type': 'LocalBusiness',
            name: 'AMS Civil Construction',
          },
          areaServed: {
            '@type': 'State',
            name: 'Maharashtra',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Construction Services',
            itemListElement: data.benefits?.map((benefit: string) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: benefit,
              },
            })),
          },
        };
        break;
        
      case 'Review':
        schemaObj = {
          ...schemaObj,
          '@type': 'Review',
          author: { '@type': 'Person', name: data.author },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: data.rating,
            bestRating: '5',
          },
          reviewBody: data.text,
          publisher: {
            '@type': 'Organization',
            name: 'Google'
          }
        };
        break;
    }

    setSchema(JSON.stringify(schemaObj));
  }, [type, data]);

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  );
}
