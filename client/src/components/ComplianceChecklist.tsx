import { complianceChecklists, RiskLevel } from '@/lib/data/complianceChecklistData';
import { CheckCircle2, Circle, Download, Printer } from 'lucide-react';
import { useState } from 'react';

interface ComplianceChecklistProps {
  riskLevel: RiskLevel;
}

export function ComplianceChecklist({ riskLevel }: ComplianceChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const items = complianceChecklists[riskLevel];

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof items>
  );

  const completedCount = checkedItems.size;
  const totalCount = items.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const checklistText = generateChecklistText();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(checklistText));
    element.setAttribute('download', `compliance-checklist-${riskLevel}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateChecklistText = () => {
    let text = `COMPLIANCE CHECKLIST - ${riskLevel.toUpperCase()} RISK\n`;
    text += `Generated: ${new Date().toLocaleDateString()}\n`;
    text += `Completion: ${completedCount}/${totalCount} (${completionPercentage}%)\n\n`;

    Object.entries(groupedItems).forEach(([category, categoryItems]) => {
      text += `\n${category}\n`;
      text += '='.repeat(category.length) + '\n';
      categoryItems.forEach((item) => {
        const checked = checkedItems.has(item.id) ? '[✓]' : '[ ]';
        text += `${checked} ${item.task}\n`;
        text += `    ${item.description}\n`;
        if (item.priority === 'critical') {
          text += `    Priority: CRITICAL\n`;
        }
        text += '\n';
      });
    });

    return text;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Compliance Checklist</h3>
          <p className="text-sm text-gray-600 mt-1">
            {completedCount} of {totalCount} items completed ({completionPercentage}%)
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Checklist Items by Category */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">{category}</h4>
            </div>
            <div className="divide-y divide-gray-200">
              {categoryItems.map((item) => {
                const isChecked = checkedItems.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="flex-shrink-0 mt-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        {isChecked ? (
                          <CheckCircle2 size={20} className="text-green-600" />
                        ) : (
                          <Circle size={20} />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`font-medium ${
                              isChecked ? 'text-gray-500 line-through' : 'text-gray-900'
                            }`}
                          >
                            {item.task}
                          </p>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {item.priority === 'critical' && (
                              <span className="px-2 py-1 text-xs font-bold text-white bg-red-600 rounded">
                                CRITICAL
                              </span>
                            )}
                            {item.gdprRelevant && item.pdpaRelevant && (
                              <span className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded">
                                GDPR/PDPA
                              </span>
                            )}
                            {item.gdprRelevant && !item.pdpaRelevant && (
                              <span className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded">
                                GDPR
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Checklist Summary</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Total items: {totalCount}</li>
          <li>✓ Completed: {completedCount}</li>
          <li>✓ Remaining: {totalCount - completedCount}</li>
          <li>✓ Critical items: {items.filter((i) => i.priority === 'critical').length}</li>
        </ul>
      </div>
    </div>
  );
}
