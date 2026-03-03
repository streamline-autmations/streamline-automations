import { FormField } from '../types';

export const contactFormFields: FormField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Your full name',
    required: true
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
    required: true
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+27 83 779 7935',
    required: true
  },
  {
    id: 'company',
    label: 'Company Name',
    type: 'text',
    placeholder: 'Your company name',
    required: false
  },
  {
    id: 'service',
    label: 'Service Interested In',
    type: 'select',
    placeholder: 'Select a service package',
    required: false,
    options: [
      { value: 'starter', label: 'Starter Automation Package' },
      { value: 'growth', label: 'Growth & Scaling Package' },
      { value: 'enterprise', label: 'Enterprise Custom Solution' },
      { value: 'custom', label: 'Other / Custom Request' }
    ]
  },
  {
    id: 'customService',
    label: 'Custom Service Request',
    type: 'text',
    placeholder: 'Describe the specific service you need...',
    required: false,
    // Only show if service is 'custom' - logic handled in component
  },
  {
    id: 'message',
    label: 'Any other information?',
    type: 'textarea',
    placeholder: 'Tell us more about your project needs, timeline, or any specific challenges...',
    required: false
  },
  {
    id: 'file',
    label: 'Upload File',
    type: 'file',
    placeholder: 'Upload relevant documents',
    required: false
  }
];

export const expectationsList = [
  'Free 15-min discovery call',
  'Tailored automation strategy',
  'Clear pricing & timeline',
  'No technical jargon'
];