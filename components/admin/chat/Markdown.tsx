'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="markdown-body text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: (props) => (
            <pre className="bg-[#0d1117] text-gray-100 rounded-lg p-4 overflow-x-auto my-3 text-xs leading-relaxed" {...props} />
          ),
          code: (props) => (
            <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-[0.85em]" {...props} />
          ),
          a: (props) => (
            <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          ul: (props) => <ul className="list-disc ml-5 my-2 space-y-1" {...props} />,
          ol: (props) => <ol className="list-decimal ml-5 my-2 space-y-1" {...props} />,
          h1: (props) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
          h2: (props) => <h2 className="text-lg font-bold mt-4 mb-2" {...props} />,
          h3: (props) => <h3 className="text-base font-bold mt-3 mb-1" {...props} />,
          table: (props) => <table className="border-collapse my-3 w-full text-xs" {...props} />,
          th: (props) => <th className="border border-gray-200 dark:border-gray-600 px-2 py-1 text-left bg-gray-50 dark:bg-gray-800" {...props} />,
          td: (props) => <td className="border border-gray-200 dark:border-gray-600 px-2 py-1" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
