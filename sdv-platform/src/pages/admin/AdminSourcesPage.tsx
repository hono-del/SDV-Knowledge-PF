import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { knowledgeSources } from '../../data/analytics';
import type { KnowledgeSource } from '../../types';
import { DEMO_PDF_FILENAME, DEMO_PDF_PATH, isDemoPdfFilename } from '../../data/knowledgeStore';
import { Plus, Play, Eye, CheckCircle, Clock, X, Globe, ChevronRight, Upload, FileText, Link, Download } from 'lucide-react';

export const AdminSourcesPage: React.FC = () => {
  const { language, addLog } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const [sources, setSources] = useState<KnowledgeSource[]>(knowledgeSources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sourceType, setSourceType] = useState<'url' | 'pdf' | 'html'>('url');
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  const handleModalClose = () => {
    setShowAddModal(false);
    setSourceType('url');
    setSelectedFile(null);
    setDragOver(false);
    setPdfError(false);
    setNewUrl('');
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) { setSelectedFile(file); setPdfError(false); }
  };

  const handleImport = (source: KnowledgeSource) => {
    addLog({ actorType: 'admin', market: source.market, language, eventType: 'knowledge_import', metadata: { sourceId: source.id } });
    navigate(`/admin/pipeline/${source.id}`);
  };

  const statusBadge = (status: KnowledgeSource['status']) => {
    switch (status) {
      case 'connected': return <span className="flex items-center gap-1 text-green-600 text-xs font-medium"><CheckCircle size={12} /> {T('connected')}</span>;
      case 'pending': return <span className="flex items-center gap-1 text-yellow-600 text-xs font-medium"><Clock size={12} /> {T('pending')}</span>;
      default: return <span className="text-gray-400 text-xs">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <button onClick={() => navigate('/admin')} className="hover:text-teal-600">{T('adminConsole')}</button>
              <ChevronRight size={14} />
              <span className="text-navy-900">{T('knowledgeSources')}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900">{T('knowledgeSources')}</h1>
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn-teal flex items-center gap-2">
            <Plus size={16} />
            {T('addSource')}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="space-y-4">
          {sources.map(source => (
            <div key={source.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center gap-3 mb-1">
                      {source.type === 'document'
                        ? <FileText size={16} className="text-teal-500 flex-shrink-0" />
                        : <Globe size={16} className="text-teal-500 flex-shrink-0" />}
                      <h3 className="font-semibold text-navy-900">{source.name[language]}</h3>
                      {statusBadge(source.status)}
                    </div>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 hover:underline flex items-center gap-1 mb-3">
                      {source.url}
                      <Globe size={10} />
                    </a>
                    <div className="grid grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-gray-400 mb-0.5">{T('type')}</div>
                        <div className="text-gray-700 font-medium">{source.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-0.5">{T('brand')}</div>
                        <div className="text-gray-700 font-medium">{source.brand}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-0.5">{T('vehicle')}</div>
                        <div className="text-gray-700 font-medium">
                          {source.vehicle === 'fj' ? 'Land Cruiser FJ' : source.vehicle === 'bz4x' ? 'bZ4X' : (language === 'ja' ? '横断' : 'Cross-market')}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-0.5">{T('productCount')}</div>
                        <div className="text-gray-700 font-medium">{source.productCount}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleImport(source)}
                      className="btn-teal flex items-center gap-1.5 text-sm py-2 px-3"
                    >
                      <Play size={14} />
                      {T('importNow')}
                    </button>
                    <button
                      onClick={() => navigate('/admin/knowledge')}
                      className="btn-secondary flex items-center gap-1.5 text-sm py-2 px-3"
                    >
                      <Eye size={14} />
                      {T('viewParsedData')}
                    </button>
                  </div>
                </div>
                {source.lastImported && (
                  <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-50">
                    {T('lastImported')}: {new Date(source.lastImported).toLocaleString(language === 'ja' ? 'ja-JP' : 'en-US')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-navy-900">{T('addSource')}</h2>
              <button onClick={handleModalClose} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Source type tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
              {([
                { key: 'url', icon: <Link size={14} />, label: 'URL' },
                { key: 'pdf', icon: <FileText size={14} />, label: 'PDF' },
                { key: 'html', icon: <Globe size={14} />, label: 'HTML' },
              ] as const).map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => { setSourceType(key); setSelectedFile(null); setPdfError(false); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    sourceType === key
                      ? 'bg-white text-teal-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {icon}{label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {/* Input area — changes by type */}
              {sourceType === 'url' ? (
                <div>
                  <label className="text-sm text-gray-600 block mb-1">URL</label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                    placeholder="https://..."
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-600 block mb-1">
                    {sourceType === 'pdf' ? 'PDFファイル' : 'HTMLファイル'}をアップロード
                  </label>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleFileDrop}
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      dragOver
                        ? 'border-teal-400 bg-teal-50'
                        : selectedFile
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="file"
                      accept={sourceType === 'pdf' ? '.pdf' : '.html,.htm'}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={e => { setSelectedFile(e.target.files?.[0] ?? null); setPdfError(false); }}
                    />
                    {selectedFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <FileText size={28} className="text-green-500" />
                        <p className="text-sm font-medium text-green-700">{selectedFile.name}</p>
                        <p className="text-xs text-green-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Upload size={28} />
                        <p className="text-sm font-medium">
                          {language === 'ja'
                            ? 'ドラッグ＆ドロップ、またはクリックして選択'
                            : 'Drag & drop or click to browse'}
                        </p>
                        <p className="text-xs">
                          {sourceType === 'pdf' ? '.pdf' : '.html / .htm'} 対応
                        </p>
                      </div>
                    )}
                  </div>
                  {sourceType === 'pdf' && (
                    <div className="mt-2 flex items-center justify-between gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-indigo-800">
                          {language === 'ja' ? 'デモ用PDF' : 'Demo PDF'}
                        </p>
                        <p className="text-[11px] text-indigo-600 truncate">{DEMO_PDF_FILENAME}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <a
                          href={DEMO_PDF_PATH}
                          download={DEMO_PDF_FILENAME}
                          onClick={e => e.stopPropagation()}
                          className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-100"
                        >
                          <Download size={12} />
                          {language === 'ja' ? '入手' : 'Get'}
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            navigate(`/admin/pipeline/source-insight?file=${encodeURIComponent(DEMO_PDF_FILENAME)}&type=pdf`);
                            handleModalClose();
                          }}
                          className="text-xs font-medium bg-indigo-600 text-white px-2.5 py-1 rounded-lg hover:bg-indigo-700"
                        >
                          {language === 'ja' ? 'このPDFで取り込む' : 'Import this PDF'}
                        </button>
                      </div>
                    </div>
                  )}
                  {pdfError && (
                    <p className="mt-2 text-xs text-red-600">
                      {language === 'ja'
                        ? `このデモでは「${DEMO_PDF_FILENAME}」のみ処理できます。上のボタンから取り込むか、同名ファイルを選択してください。`
                        : `This mock only processes “${DEMO_PDF_FILENAME}”. Use the demo button or select that file.`}
                    </p>
                  )}
                </div>
              )}

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                {language === 'ja'
                  ? '※ URLは既知のデモサイト、PDFは Regional Market & Customer Insight Guide がAI Ready化シミュレーション対象です。'
                  : '※ AI Ready simulation is available for known demo URLs and the Regional Market & Customer Insight Guide PDF.'}
              </div>

              <div className="flex gap-3">
                <button onClick={handleModalClose} className="flex-1 btn-secondary">
                  {T('cancel')}
                </button>
                <button
                  disabled={sourceType === 'url' ? !newUrl : !selectedFile}
                  onClick={() => {
                    if (sourceType === 'url' && newUrl) {
                      const isFj = newUrl.includes('FJ001') || newUrl.includes('factory.kinto');
                      const isBz = newUrl.includes('BZ') || newUrl.includes('bz4x') || newUrl.includes('BZT');
                      const sourceId = isFj ? 'source-fj' : isBz ? 'source-bz4x' : `source-custom-${Date.now()}`;
                      navigate(`/admin/pipeline/${sourceId}?url=${encodeURIComponent(newUrl)}`);
                      handleModalClose();
                    } else if (sourceType === 'pdf') {
                      if (selectedFile && !isDemoPdfFilename(selectedFile.name)) {
                        setPdfError(true);
                        return;
                      }
                      const fileName = selectedFile?.name ?? DEMO_PDF_FILENAME;
                      navigate(`/admin/pipeline/source-insight?file=${encodeURIComponent(fileName)}&type=pdf`);
                      handleModalClose();
                    } else if (selectedFile) {
                      navigate(`/admin/pipeline/source-custom-${Date.now()}?file=${encodeURIComponent(selectedFile.name)}&type=${sourceType}`);
                      handleModalClose();
                    }
                  }}
                  className="flex-1 btn-teal disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {T('importNow')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
